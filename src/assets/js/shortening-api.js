const urlBase = "https://api.shrtco.de/v2/shorten?url=";

export const shorteningLink = async (url) => {
  try {
    const response = await fetch(urlBase + url);

    const results = await response.json();
    const shortenLink = await results.result;
    console.log(shortenLink.full_share_link);
    return shortenLink.full_share_link;
  } catch (e) {
    return false;
  }
};

export const shorteningLinkToHtml = async (url) => {
  const shortenLink = await shorteningLink(url);
  return ` 
        <li><div><a href="#">${url}</a></div><div><a class="shortenLinkToCopy" href="#">${shortenLink}</a><a class="copy" href="#">copy</a></div></li>
    `;
};
