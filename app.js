var query = `query {
  user(login: "erinoggz"){
  avatarUrl(size: 200)
  bio
  login
  twitterUsername
  repositories(last: 20) {
    totalCount
   nodes {
     name
    description
    primaryLanguage{
      name
    } 
    licenseInfo{
      name
    }
    forkCount
    updatedAt
    stargazerCount
   }
 }
}
}`;
async function queryFetch() {
  await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "bearer PUT_BEARER_TOKEN_HERE_WOULD_HAVE_USED_DOTENV_BUT_DONT_KNOW_IF_ITS_ALLOWED",
    },
    body: JSON.stringify({ query }),
  })
    .then((r) => r.json())
    .then((res) => {
      const img = (document.getElementById("img").src =
        res.data.user.avatarUrl);
      const ul = document.getElementById("ids");
      const userName = document.getElementById("username");
      const twitName = document.getElementById("twit-username");
      const bio = document.getElementById("bio");
      const repoDom = document.getElementById("total-repo");
      const repo = document.getElementById("repo-world-bold");

      const mappedData = res.data.user.repositories.nodes.map((el, i) => {
        // el.replace('/,/g', '')
        console.log([el])
        var date = new Date(`${el.updatedAt}`);
        var options = { month: "short", day: "numeric", year: "numeric" };
        const fineDate = new Intl.DateTimeFormat("dd-mm", options).format(
          date
        );
        const val = `
        <div class="main-comp">
        <div class="text">
              <h3 class="text__heading">${el.name}</h3>
              <p class="description">${
                el.description ? el.description : ""
              }</p>
              <div class="details">
              ${
                el.primaryLanguage
                  ? `
                 <p class= ${
                   el.primaryLanguage.name === "JavaScript"
                     ? "yellow"
                     : el.primaryLanguage.name === "TypeScript"
                     ? "typescript"
                     : el.primaryLanguage.name === "ActionScript"
                     ? "brownish"
                     : el.primaryLanguage.name === "HTML"
                     ? "red"
                     : el.primaryLanguage.name === "CSS"
                     ? "purple"
                     : el.primaryLanguage.name === "Python"
                     ? "python"
                     : " "
                 }></p>`
                  : ""
              }
              ${
                el.primaryLanguage
                  ? `<span class="prog-lan">${
                      el.primaryLanguage ? el.primaryLanguage.name : ""
                    }</span>`
                  : ""
              }
              
              
              ${
                el.forkCount >= 1
                  ? `<svg aria-label="fork" class="fork-count-icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path></svg>`
                  : ""
              }
              ${
                el.forkCount
                  ? `<span class="fork-count"> ${
                      el.forkCount >= 1 ? el.forkCount : ""
                    } </span>`
                  : ""
              }

              
              ${
                el.licenseInfo
                  ? `<svg class="license-info-icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8.75.75a.75.75 0 00-1.5 0V2h-.984c-.305 0-.604.08-.869.23l-1.288.737A.25.25 0 013.984 3H1.75a.75.75 0 000 1.5h.428L.066 9.192a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.514 3.514 0 00.686.45A4.492 4.492 0 003 11c.88 0 1.556-.22 2.023-.454a3.515 3.515 0 00.686-.45l.045-.04.016-.015.006-.006.002-.002.001-.002L5.25 9.5l.53.53a.75.75 0 00.154-.838L3.822 4.5h.162c.305 0 .604-.08.869-.23l1.289-.737a.25.25 0 01.124-.033h.984V13h-2.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-2.5V3.5h.984a.25.25 0 01.124.033l1.29.736c.264.152.563.231.868.231h.162l-2.112 4.692a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.517 3.517 0 00.686.45A4.492 4.492 0 0013 11c.88 0 1.556-.22 2.023-.454a3.512 3.512 0 00.686-.45l.045-.04.01-.01.006-.005.006-.006.002-.002.001-.002-.529-.531.53.53a.75.75 0 00.154-.838L13.823 4.5h.427a.75.75 0 000-1.5h-2.234a.25.25 0 01-.124-.033l-1.29-.736A1.75 1.75 0 009.735 2H8.75V.75zM1.695 9.227c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327l-1.305 2.9zm10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327l-1.305 2.9z"></path></svg>`
                  : ""
              }
              ${
                el.licenseInfo
                  ? `<span class="licence-info"> ${el.licenseInfo.name} </span>`
                  : ""
              }
              <span class="text__time">Updated on ${fineDate}</span>
              </div>
        </div>
              <div class="star">
      <button class="star__button">
        <svg
          class="octicon octicon-star mr-1"
          viewBox="0 0 16 16"
          version="1.1"
          width="16"
          height="16"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
          ></path>
        </svg>
        <p class="star__text">Star</p>
      </button>
      </div>
          
          </div>
          
          <hr class="hr-line" />`;
        return val;
      });
      img.innerHTML = res.data.user.avatarUrl;
      userName.innerHTML = res.data.user.login;
      twitName.innerHTML = res.data.user.twitterUsername;
      bio.innerHTML = res.data.user.bio;
      ul.innerHTML = mappedData;
      repo.innerHTML = res.data.user.repositories.nodes.length;
      repoDom.innerHTML = res.data.user.repositories.totalCount - 2;
     
    })
    .catch((err) => console.log(err));
}
queryFetch();