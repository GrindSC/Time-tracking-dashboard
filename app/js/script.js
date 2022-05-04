let timeFrame = "weekly";
const container = document.querySelector(".container");
let activities;
const timeMenu = document.querySelectorAll(".time-select");
const timeFrameText = {
  daily: "Yesterday",
  weekly: "Last Week",
  monthly: "Last Month",
};

//Initialize Menu
timeMenu.forEach((element) => {
  element.addEventListener("click", timeStampChange);
});

//Get JSON Data
let data = {};
fetch("/Time-tracking-dashboard/app/js/data.json")
  .then((resp) => resp.json())
  .then((jsonData) => {
    jsonData.forEach((element) => {
      container.insertAdjacentHTML("beforeend", createCard(element, timeFrame));
    });
    jsonData.forEach((element) => {
      data[element.title] = element.timeframes;
    });
    activities = document.querySelectorAll(".activity-box");
  });

//Functions
function timeStampChange(event) {
  //console.log("click", event.target.innerText.toLowerCase());
  timeMenu.forEach((element) => {
    element.classList.remove("menu-active");
    event.target.classList.add("menu-active");
    timeFrame = event.target.innerText.toLowerCase();
    updateCards(timeFrame);
  });
}

function updateCards(timeFrame) {
  activities.forEach((card) => {
    updateCard(card, timeFrame);
  });
}

function updateCard(card, timeFrame) {
  let activity = card.querySelector(".activity").innerText;
  card.querySelector(
    ".time"
  ).innerText = `${data[activity][timeFrame]["current"]}hrs`;
  card.querySelector(
    ".last-time"
  ).innerText = `${timeFrameText[timeFrame]} - ${data[activity][timeFrame]["previous"]}hrs`;
}

function createCard(element, timeFrame) {
  let activity = element["title"];
  let currentTime = element["timeframes"][timeFrame]["current"];
  let previousTime = element["timeframes"][timeFrame]["previous"];

  return `
  <div class="activity-box ${activity.toLowerCase().replace(/\s/g, "-")}">
    <div class="content-box">
      <div class="content-display">
        <div class="row-1">
          <div class="activity">${activity}</div>
          <div class="points">
            <div class="point"></div>
            <div class="point"></div>
            <div class="point"></div>
          </div>
        </div>
        <div class="row-2">
          <div class="time">${currentTime}hrs</div>
          <div class="last-time">${
            timeFrameText[timeFrame]
          } - ${previousTime}hrs</div>
        </div>
      </div>
    </div>
  </div>;`;
}
