const urlBase = "https://api.shrtco.de/v2/shorten?url=";

export const shorteningLink = async (url) => {
  try {
    const response = await fetch(urlBase + url);
    const results = await response.json();
    const shortenLink = await results.result;
    return shortenLink.full_share_link;
  } catch (e) {
    return false;
  }
};

export const shorteningLinkToHtml = async (url) => {
  const shortenLink = await shorteningLink(url);

  return `
        <li><div><a>${url}</a></div><div><a class="shortenLinkToCopy">${shortenLink}</a><a class="copy">copy</a><svg width="64" height="64" class="trash" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 6h18"></path>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        <path d="M10 11v6"></path>
        <path d="M14 11v6"></path>
      </svg></div></li>
    `;
};
