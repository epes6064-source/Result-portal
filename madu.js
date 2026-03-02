function checkResult() {
  
  let regNo = document.getElementById("regNo").value;
  let studentClass = document.getElementById("class").value;
  
  let url = "https://script.google.com/macros/s/AKfycbyyIZQzWcRyCe6IQsf2O7mFFvT1s8XGkvywun_CajY9NOjayWID6fKUecm9REMALn5Unw/exec?regNo=" + regNo + "&class=" + studentClass;
  
  fetch(url)
    .then(res => res.json())
    .then(data => {
      
      if (data.error) {
        alert("Result Not Found");
        return;
      }
      
      let subjects = ["Fiqh", "Aqeeda", "Tazkiya", "Nahw", "Hifz"];
      let total = 0;
      let tableHTML = "";
      
      data.marks.forEach((mark, index) => {
        total += Number(mark);
        tableHTML += `
        <tr>
          <td>${subjects[index]}</td>
          <td>${mark}</td>
        </tr>
      `;
      });
      
      let average = total / data.marks.length;
      let grade = calculateGrade(average);
      let statusText = average >= 40 ? "PASS" : "FAIL";
      let statusClass = average >= 40 ? "pass" : "fail";
      
      document.getElementById("name").innerText = data.name;
      document.getElementById("reg").innerText = data.regNo;
      document.getElementById("cls").innerText = data.class;
      
      document.getElementById("marksTable").innerHTML = tableHTML;
      
      document.getElementById("total").innerText = total;
      document.getElementById("average").innerText = average.toFixed(2);
      document.getElementById("grade").innerText = grade;
      
      let statusElement = document.getElementById("status");
      statusElement.innerText = statusText;
      statusElement.className = statusClass;
      
      document.getElementById("formPage").style.display = "none";
      document.getElementById("resultPage").style.display = "block";
      
    });
}

function calculateGrade(avg) {
  if (avg >= 90) return "A+";
  if (avg >= 80) return "A";
  if (avg >= 70) return "B+";
  if (avg >= 60) return "B";
  if (avg >= 50) return "C";
  if (avg >= 40) return "D";
  return "F";
}