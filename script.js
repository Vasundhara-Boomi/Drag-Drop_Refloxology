const AP = [
    {
      APName: "Forehead",
      imagePath: "images/Forehead.png"
    },
    {
      APName: "Temples",
      imagePath: "images/Temples.png"
    },
    {
        APName: "Ear-gate",
        imagePath: "images/Ear-gate.png"
      },
      {
        APName: "Ear-apex",
        imagePath: "images/Ear-apex.png"
      },
      {
        APName: "Gallbladder",
        imagePath: "images/Gallbladder.png"
      },
      {
        APName: "Four Seams",
        imagePath: "images/Four_Seams.png"
      },
      {
        APName: "Small Intestine 3",
        imagePath: "images/Small_intestine.png"
      },
      {
        APName: "Hand Valley Point",
        imagePath: "images/Hand_valley_point.png"
      },
      {
        APName: "Inner Gate Point",
        imagePath: "images/Inner_gate_point.png"
      },
      {
        APName: "Lung Merdian",
        imagePath: "images/Lung_Meridian.png"
      },
      {
        APName: "Ten Dispersions",
        imagePath: "images/Ten_dispersions.png"
      },
      {
        APName: "Heart 7",
        imagePath: "images/Heart7.png"
      }
];
  let correct = 0;
  let total = 0;
  const totalDraggableItems = 5;
  const totalMatchingPairs = 5; // Should be <= totalDraggableItems
  
  const scoreSection = document.querySelector(".score");
  const correctSpan = scoreSection.querySelector(".correct");
  const totalSpan = scoreSection.querySelector(".total");
  const playAgainBtn = scoreSection.querySelector("#play-again-btn");
  
  const draggableItems = document.querySelector(".draggable-items");
  const matchingPairs = document.querySelector(".matching-pairs");
  let draggableElements;
  let droppableElements;
  initiateGame()
  
  function initiateGame() {
    const randomDraggableBrands = generateRandomItemsArray(totalDraggableItems, AP);
    const randomDroppableBrands = totalMatchingPairs < totalDraggableItems ? generateRandomItemsArray(totalMatchingPairs, randomDraggableBrands) : randomDraggableBrands;
    const alphabeticallySortedRandomDroppableBrands = [...randomDroppableBrands].sort((a, b) => a.APName.toLowerCase().localeCompare(b.APName.toLowerCase()));
  
    // Create "draggable-items" and append to DOM
    for (let i = 0; i < randomDraggableBrands.length; i++) {
      document.querySelector(".draggable-items").insertAdjacentHTML("beforeend", `
          <img src="${randomDraggableBrands[i].imagePath}" class="draggable" draggable="true" id="${randomDraggableBrands[i].imagePath}">
      `);
  }
  
    // Create "matching-pairs" and append to DOM
    for (let i = 0; i < alphabeticallySortedRandomDroppableBrands.length; i++) {
      matchingPairs.insertAdjacentHTML("beforeend", `
        <div class="matching-pair">
          <span class="label">${alphabeticallySortedRandomDroppableBrands[i].APName}</span>
          <span class="droppable" data-brand="${alphabeticallySortedRandomDroppableBrands[i].imagePath}"></span>
        </div>
      `);
    }
  
    draggableElements = document.querySelectorAll(".draggable");
    droppableElements = document.querySelectorAll(".droppable");
  
    draggableElements.forEach(elem => {
      elem.addEventListener("dragstart", dragStart);
    });
  
    droppableElements.forEach(elem => {
      elem.addEventListener("dragenter", dragEnter);
      elem.addEventListener("dragover", dragOver);
      elem.addEventListener("dragleave", dragLeave);
      elem.addEventListener("drop", drop);
    });
  }
  // Drag and Drop Functions
  
  //Events fired on the drag target
  
  function dragStart(event) {
    event.dataTransfer.setData("text", event.target.id); // or "text/plain"
  }
  
  //Events fired on the drop target
  
  function dragEnter(event) {
    if(event.target.classList && event.target.classList.contains("droppable") && !event.target.classList.contains("dropped")) {
      event.target.classList.add("droppable-hover");
    }
  }
  
  function dragOver(event) {
    if(event.target.classList && event.target.classList.contains("droppable") && !event.target.classList.contains("dropped")) {
      event.preventDefault();
    }
  }
  
  function dragLeave(event) {
    if(event.target.classList && event.target.classList.contains("droppable") && !event.target.classList.contains("dropped")) {
      event.target.classList.remove("droppable-hover");
    }
  }
  
// ... (your existing code remains unchanged)

function drop(event) {
  event.preventDefault();
  event.target.classList.remove("droppable-hover");
  const draggableElementBrand = event.dataTransfer.getData("text");
  const droppableElementBrand = event.target.getAttribute("data-brand");
  const isCorrectMatching = draggableElementBrand === droppableElementBrand;
  total++;
  if (isCorrectMatching) {
    const draggableElement = document.getElementById(draggableElementBrand);
    event.target.classList.add("dropped");
    draggableElement.classList.add("dragged");
    draggableElement.setAttribute("draggable", "false");
    const img = document.createElement("img");
    img.src = draggableElement.src;
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    event.target.appendChild(img);
    correct++;
    console.log('Correct:', correct, 'Total:', total);
    // Display description for the matched pair
    
    displayDescription(droppableElementBrand);
    correctSpan.textContent = correct;
    totalSpan.textContent = total;
  }

  correctSpan.textContent = correct;
  totalSpan.textContent = total;
  scoreSection.style.opacity = 0;
  setTimeout(() => {
    scoreSection.style.opacity = 1;
  }, 200);

  if (correct === Math.min(totalMatchingPairs, totalDraggableItems)) {
    playAgainBtn.style.display = "block";
    setTimeout(() => {
      playAgainBtn.classList.add("play-again-btn-entrance");
    }, 200);
  }
}

// Function to display description based on the matched pair
function displayDescription(pair) {
  const descriptionContent = document.querySelector(".description-content");
  // Add your descriptions here based on the matched pair
  const descriptions = {
    "images/Forehead.png": "It helps with anxiety-related symptoms such as: Insomnia, restlessness and irritability",
    "images/Temples.png": "Helps treat headache pain from migraine attacks and also decreases dizziness and promotes healthy vision.",
    "images/Ear-gate.png": "It helps treat pain from toothache and also helps address tinnitus, lip stiffness, and ear discharge.",
    "images/Ear-apex.png": "Improves a variety of ear conditions and also helps decrease migraine pain in certain cases.",
    "images/Gallbladder.png": "Reduces neck stiffness and can also reduce pain in the back and shoulders.",
    "images/Four_Seams.png":"Helps treat digestive problems, especially in children.",
    "images/Hand_valley_point.png":"Reduces stress, stop migraines, and stop pain in the: shoulders, teeth and neck.",
    "images/Heart7.png":"Applying pressure to heart 7 will prevent: insomnia, anxiety, depression and heart disease.",
    "images/Inner_gate_point.png":"Helps relieve nausea and stomach pain and can also help other digestive problems.",
    "images/Lung_Meridian.png":"Helps relieve symptoms associated with a cold, including sneezing, chills, and a sore throat.",
    "images/Small_intestine.png":"It helps relieve earaches, headaches in the back of the head, and neck pain.",
    "images/Ten_dispersions.png":"Help relieve some common flu symptoms, such as a high fever or a sore throat."
    
  };
  // Update the description content based on the matched pair
  if (descriptions.hasOwnProperty(pair)) {
    descriptionContent.textContent = descriptions[pair];
  } else {
    descriptionContent.textContent = "Description not available.";
  }
}
// ... (rest of your code remains unchanged)

  
  // Other Event Listeners
  playAgainBtn.addEventListener("click", playAgainBtnClick);
  function playAgainBtnClick() {
    playAgainBtn.classList.remove("play-again-btn-entrance");
    correct = 0;
    total = 0;
    draggableItems.style.opacity = 0;
    matchingPairs.style.opacity = 0;
    setTimeout(() => {
      scoreSection.style.opacity = 0;
    }, 100);
    setTimeout(() => {
      playAgainBtn.style.display = "none";
      while (draggableItems.firstChild) draggableItems.removeChild(draggableItems.firstChild);
      while (matchingPairs.firstChild) matchingPairs.removeChild(matchingPairs.firstChild);
      initiateGame();
      correctSpan.textContent = correct;
      totalSpan.textContent = total;
      draggableItems.style.opacity = 1;
      matchingPairs.style.opacity = 1;
      scoreSection.style.opacity = 1;
    }, 500);
  }
  // Function to generate draggable items and append them to the DOM
  function generateDraggableItems() {
    const draggableItems = document.querySelector(".draggable-items");
  
    const randomDraggableBrands = generateRandomItemsArray(totalDraggableItems, AP);
  for (let i = 0; i < randomDraggableBrands.length; i++) {
    draggableItems.insertAdjacentHTML("beforeend", `
      <img src="${randomDraggableBrands[i].imagePath}" class="draggable" draggable="true" id="${randomDraggableBrands[i].imagePath}">
    `);
  }

  draggableElements = document.querySelectorAll(".draggable");
  draggableElements.forEach(elem => {
    elem.addEventListener("dragstart", dragStart);
  });
  }
  // Auxiliary functions
  function generateRandomItemsArray(n, originalArray) {
    let res = [];
    let clonedArray = [...originalArray];
    if(n>clonedArray.length) n=clonedArray.length;
    for(let i=1; i<=n; i++) {
      const randomIndex = Math.floor(Math.random()*clonedArray.length);
      res.push(clonedArray[randomIndex]);
      clonedArray.splice(randomIndex, 1);
    }
    return res;
  }


generateDraggableItems();