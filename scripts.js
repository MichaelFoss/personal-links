const onLoad = () => {
	const linksEl = document.querySelector('.links');
  let activeLinkId = null;
  let currentLinkId = 0;

  const createLink = link => {
		const aEl = document.createElement('a');
		aEl.href = link.url;
		aEl.innerText = link.title;
    aEl.id = `link_${currentLinkId}`;
    if (link.isActive) {
      activeLinkId = currentLinkId;
    }
    currentLinkId++;
    return aEl;
  };

  const wrapInLi = el => {
    const li = document.createElement('li');
    li.append(el);
    return li;
  };

	links.forEach(link => {
    // Multiple links
    if (link.title && link.links) {
      const spanEl = document.createElement('span');
      spanEl.innerText = link.title;
      const linkEl = wrapInLi(spanEl);

      // Create the interior ol
      const subLinksEl = document.createElement('ol');

      // Add each link to the ol
      const subLinksLiEls = link.links
        .map(createLink)
        .map(wrapInLi);
      subLinksLiEls.forEach(el => subLinksEl.append(el));
      linkEl.append(subLinksEl);
      linksEl.append(linkEl);
    }
    // Single link
    else if (link.title && link.url) {
      const linkEl = createLink(link);
      const liEl = wrapInLi(linkEl);
      linksEl.append(liEl);
		}
	});

  if (activeLinkId !== null) {
    const activeLink = document.querySelector(`#link_${activeLinkId}`);
    activeLink.focus();
  }
};

window.addEventListener('load', onLoad);
	
