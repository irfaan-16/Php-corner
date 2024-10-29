(async () => {
  const res = await fetch("data.json");
  const data = await res.json();
  const keys = Object.keys(data);
  const sidebar = document.querySelector(".navContent");
  const container = document.querySelector(".container");

  let currentTopic = "Introduction";
  function escapeHtml(html) {
    return html
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
  const renderContent = () => {
    container.innerHTML = "";
    const heading = document.createElement("h1");
    heading.innerHTML = currentTopic;
    const description = document.createElement("p");
    description.innerHTML = data[currentTopic].description;
    container.append(heading);
    container.append(description);

    const topics = data[currentTopic].topics;

    const topicsContainer = document.createElement("div");
    topicsContainer.classList.add("topics");
    topics.forEach((topic) => {
      const div = document.createElement("div");
      div.classList.add("topic");

      div.innerHTML = `
         <h3>${topic.title} </h3>
            <p>
             ${topic.content}
            </p>
        `;
      if (topic.example) {
        div.innerHTML += `
              <div class="snippet">
                 <pre><code>${escapeHtml(topic.example || "")}</code></pre>
            </div>`;
      }
      topicsContainer.append(div);
    });
    console.log(topics);

    container.append(topicsContainer);
  };

  const setCurrentItem = (topic) => {
    console.log(topic);
  };
  const renderSideBar = () => {
    sidebar.innerHTML = keys
      .map((key) => {
        return `
      <div class="navButton">
        <span>${key}</span>
      </div>
    `;
      })
      .join("");
  };

  sidebar.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("navButton")) {
      currentTopic = target.querySelector("span").innerHTML;
      renderContent();
    }
  });

  renderSideBar();
  renderContent();
})();
