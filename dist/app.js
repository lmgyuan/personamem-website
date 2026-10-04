'use strict';
(() => {
  const data = window.PERSONAMEM_DATA;
  const $ = (selector) => document.querySelector(selector);
  const state = { release: 'v3', sort: 'score', direction: -1, query: '', provider: 'all', setting: 'all' };
  const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const link = (url, label) => `<a href="${escape(url)}" target="_blank" rel="noopener noreferrer">${label} <span aria-hidden="true">↗</span></a>`;
  const resources = d => link(d.paper, 'Paper') + link(d.code, 'Code') + link(d.data, 'Dataset');
  function selectRelease(id, updateURL = true) {
    if (!data[id]) return;
    const d = data[id];
    Object.assign(state, {release:id,sort:'score',direction:-1,query:'',provider:'all',setting:d.defaultSetting});
    document.querySelectorAll('[data-release]').forEach(button => {
      const active = button.dataset.release === id;
      button.setAttribute('aria-selected', active);
      button.tabIndex = active ? 0 : -1;
    });
    $('#release-panel').setAttribute('aria-labelledby', `tab-${id}`);
    $('#release-label').textContent = d.badge;
    $('#release-heading').textContent = d.heading;
    $('#release-description').textContent = d.description;
    $('#release-links').innerHTML = resources(d);
    $('#release-stats').innerHTML = d.stats.map(([value,label]) => `<div class="stat"><strong>${escape(value)}</strong><span>${escape(label)}</span></div>`).join('');
    $('#results-description').textContent = `${d.name} · ${d.resultsDescription}`;
    $('#metric-label').textContent = d.metricLabel;
    $('#method-note').textContent = d.note;
    $('#methodology-content').innerHTML = `<p>${escape(d.methodology)}</p><p>Scores across PersonaMem releases are not directly comparable. These are historical paper snapshots, not a continuously updated ranking of all models. Equal reported scores share a rank; sort order within ties does not imply a difference in performance.</p>`;
    $('#results-source').href = d.source;
    $('#results-source').textContent = id === 'v2' ? 'View source · Figures 4 & 6 ↗' : 'View source figure ↗';
    $('#table-caption').textContent = `${d.name} published evaluation results. ${d.sourceLabel}.`;
    $('#model-search').value = '';
    $('#setting-filter').innerHTML = d.settings.map(([value,label]) => `<option value="${escape(value)}">${escape(label)}</option>`).join('');
    $('#setting-filter').value = d.defaultSetting;
    updateProviders();
    renderTable();
    if (updateURL && /^https?:$/.test(location.protocol)) {
      const url = new URL(location.href);
      url.searchParams.set('benchmark',id);
      history.replaceState(null,'',url);
    }
  }
  function matchesSetting(row) { return state.setting === 'all' || row.setting === state.setting; }
  function updateProviders() {
    const providers = [...new Set(data[state.release].rows.filter(matchesSetting).map(row=>row.provider))].sort();
    if (!providers.includes(state.provider)) state.provider = 'all';
    $('#provider-filter').innerHTML = '<option value="all">All providers</option>' + providers.map(p=>`<option value="${escape(p)}">${escape(p)}</option>`).join('');
    $('#provider-filter').value = state.provider;
  }
  function filteredRows() {
    return data[state.release].rows.filter(row=>matchesSetting(row) && (state.provider === 'all' || row.provider === state.provider) && `${row.model} ${row.mode} ${row.provider}`.toLowerCase().includes(state.query.toLowerCase().trim())).sort((a,b)=> {
      const av = a[state.sort], bv = b[state.sort];
      const order = typeof av === 'number' ? av-bv : String(av).localeCompare(String(bv));
      return order * state.direction || a.model.localeCompare(b.model) || a.mode.localeCompare(b.mode);
    });
  }
  function rankOf(row) {
    return 1 + data[state.release].rows.filter(r=>matchesSetting(r) && r.score > row.score).length;
  }
  function formatValue(key,value) {return key === 'input' ? `${value/1000}k` : value.toFixed(state.release==='v1'?0:1);}
  function renderTable() {
    const d = data[state.release];
    const cols = [['model','Model'],['mode','Method'],...d.columns];
    $('#results-table thead').innerHTML = '<tr><th scope="col">#</th>' + cols.map(([key,label]) => {
      const sorted = state.sort===key;
      return `<th scope="col" aria-sort="${sorted?(state.direction<0?'descending':'ascending'):'none'}"${key!=='model'&&key!=='mode'?' class="metric-cell"':''}><button data-sort="${key}">${escape(label)} <span aria-hidden="true">${sorted?(state.direction<0?'↓':'↑'):'↕'}</span></button></th>`;
    }).join('') + '</tr>';
    const rows = filteredRows();
    $('#results-table tbody').innerHTML = rows.map(row=>{
      const rank = rankOf(row);
      return `<tr><td class="rank">${rank===1?'<span class="rank-first">1</span>':String(rank).padStart(2,'0')}</td><td class="model">${escape(row.model)}<small>${escape(row.provider)}</small></td><td><span class="mode-tag">${escape(row.mode)}</span></td>` + d.columns.map(([key])=> {
        const value = formatValue(key,row[key]);
        return key==='score' ? `<td class="score"><span class="score-inner">${value}<span class="score-bar" aria-hidden="true"><i style="width:${row[key]}%"></i></span></span></td>` : `<td class="metric-cell">${value}</td>`;
      }).join('') + '</tr>';
    }).join('');
    $('#empty-results').hidden = rows.length > 0;
    $('#export-results').disabled = rows.length === 0;
    $('#row-count').textContent = `${rows.length} ${rows.length===1?'configuration':'configurations'} · ${d.name}`;
    $('#results-table thead').querySelectorAll('[data-sort]').forEach(button => button.addEventListener('click',()=>{
      state.direction = state.sort===button.dataset.sort ? state.direction*-1 : (['model','mode','input'].includes(button.dataset.sort)?1:-1);
      state.sort = button.dataset.sort;
      renderTable();
      $(`[data-sort="${state.sort}"]`).focus({preventScroll:true});
    }));
  }
  function download(text,type,name) {
    const url = URL.createObjectURL(new Blob([text],{type}));
    const anchor = document.createElement('a'); anchor.href=url; anchor.download=name;
    document.body.append(anchor); anchor.click(); anchor.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  function csvCell(value) {
    let text = String(value ?? '');
    if (/^[=+@\-]/.test(text)) text="'"+text;
    return '"'+text.replace(/"/g,'""')+'"';
  }
  $('#export-results').addEventListener('click',()=>{
    const d=data[state.release];
    const headers=['Benchmark','Model','Provider','Method','Setting',...d.columns.map(([key,label])=>key==='input'?`${label} (count)`:`${label} (%)`),'Source'];
    const rows=filteredRows().map(row=>[d.name,row.model,row.provider,row.mode,row.setting,...d.columns.map(([key])=>row[key]),state.release==='v2'?`https://arxiv.org/html/2512.06688v1#S4.F${row.figure}`:d.source]);
    download([headers,...rows].map(row=>row.map(csvCell).join(',')).join('\r\n')+'\r\n','text/csv;charset=utf-8',`${d.name}-${state.setting.replace(/[^a-z0-9]/gi,'-')}-results.csv`);
  });
  $('#model-search').addEventListener('input',event=>{state.query=event.target.value;renderTable();});
  $('#provider-filter').addEventListener('change',event=>{state.provider=event.target.value;renderTable();});
  $('#setting-filter').addEventListener('change',event=>{state.setting=event.target.value;updateProviders();renderTable();});
  $('#reset-filters').addEventListener('click',()=>{state.query='';state.provider='all';$('#model-search').value='';$('#provider-filter').value='all';renderTable();$('#model-search').focus();});
  document.querySelectorAll('[data-release]').forEach(button=>{
    button.addEventListener('click',()=>selectRelease(button.dataset.release));
    button.addEventListener('keydown',event=>{
      const ids=Object.keys(data);const current=ids.indexOf(state.release);let next;
      if(event.key==='ArrowRight') next=ids[(current+1)%ids.length];
      if(event.key==='ArrowLeft') next=ids[(current+ids.length-1)%ids.length];
      if(event.key==='Home') next=ids[0];if(event.key==='End') next=ids.at(-1);
      if(next){event.preventDefault();selectRelease(next);$(`[data-release="${next}"]`).focus();}
    });
  });
  document.querySelectorAll('[data-jump]').forEach(button=>button.addEventListener('click',()=>{
    selectRelease(button.dataset.jump);$('.benchmark-area').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
    $(`[data-release="${button.dataset.jump}"]`).focus({preventScroll:true});
  }));
  $('#paper-list').innerHTML = ['v3','v2','v1'].map(id=>{
    const d=data[id];
    return `<article class="paper-row"><div class="paper-index">${escape(d.name)}<span class="paper-year">${d.year}${id==='v1'?' · COLM':''}</span></div><div><h3>${escape(d.title)}</h3><p>${escape(d.blurb)}</p><details><summary>View authors</summary><p>${escape(d.authors)}</p></details><div class="resource-links">${resources(d)}</div></div><button class="text-link" data-cite="${id}">BibTeX ↗</button></article>`;
  }).join('');
  let citationID='all';
  const dialog=$('#citation-dialog');
  document.addEventListener('click',event=>{
    const button=event.target.closest('[data-cite]');if(!button)return;
    citationID=button.dataset.cite;
    $('#citation-title').textContent=citationID==='all'?'Cite the PersonaMem series':`Cite ${data[citationID].name}`;
    $('#citation-text').textContent=(citationID==='all'?Object.keys(data):[citationID]).map(id=>data[id].citation).join('\n\n');
    $('#copy-status').textContent='';dialog.showModal();
  });
  $('#close-citation').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});
  $('#copy-citation').addEventListener('click',async()=>{
    $('#copy-status').textContent='Copying…';
    try{await Promise.race([navigator.clipboard.writeText($('#citation-text').textContent),new Promise((_,reject)=>setTimeout(()=>reject(new Error('Clipboard unavailable')),1500))]);$('#copy-status').textContent='Copied to clipboard.';}
    catch{const range=document.createRange();range.selectNodeContents($('#citation-text'));const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);$('#copy-status').textContent='Text selected. Press Ctrl+C / ⌘C, or download the .bib file.';}
  });
  $('#download-citation').addEventListener('click',()=>download($('#citation-text').textContent+'\n','application/x-bibtex',`${citationID==='all'?'personamem-series':data[citationID].name}.bib`));
  const examples={
    remember:{past:'Earlier · “I usually go for a long run on Sundays.”',recent:'Later · “I’m taking a break from running and trying gentler activities.”',question:'“Any ideas for this Sunday?”',answer:'How about a relaxed walk in the botanical garden? It fits the gentler pace you’re looking for.',label:'USE THE CURRENT PREFERENCE'},
    infer:{past:'Editing a menu · “Could you swap the chicken for chickpeas?”',recent:'Planning a trip · “Let’s find a café with good oat-milk options.”',question:'“Suggest a quick lunch.”',answer:'A chickpea-and-avocado wrap could be a good fit. Would you like more plant-based options?',label:'INFER CAREFULLY FROM REPEATED CUES'},
    restrain:{past:'Prior conversations · The user enjoys cooking and hiking.',recent:'Current context · A general factual question.',question:'“What is the capital of Portugal?”',answer:'Lisbon is the capital of Portugal.',label:'PERSONALIZE ONLY WHEN IT HELPS'}
  };
  function showExample(id){const e=examples[id];$('#example-body').innerHTML=`<div class="example-context"><span>USER HISTORY</span>${escape(e.past)}<br>${escape(e.recent)}</div><div class="example-question">${escape(e.question)}</div><div class="example-answer"><strong>${escape(e.label)}</strong>${escape(e.answer)}</div>`;document.querySelectorAll('[data-example]').forEach(button=>button.setAttribute('aria-pressed',button.dataset.example===id));}
  document.querySelectorAll('[data-example]').forEach(button=>button.addEventListener('click',()=>showExample(button.dataset.example)));
  showExample('remember');
  const fromURL=new URLSearchParams(location.search).get('benchmark');selectRelease(data[fromURL]?fromURL:'v3',false);
  window.addEventListener('popstate',()=>{const id=new URLSearchParams(location.search).get('benchmark');selectRelease(data[id]?id:'v3',false);});
})();
