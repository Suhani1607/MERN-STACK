function calculateGrade() {
  const math = parseInt(document.getElementById("math").value) || 0;
  const science = parseInt(document.getElementById("science").value) || 0;
  const english = parseInt(document.getElementById("english").value) || 0;
  const computer = parseInt(document.getElementById("computer").value) || 0;
  const history = parseInt(document.getElementById("history").value) || 0;

  const total = math + science + english + computer + history;
  const percentage = (total / 500) * 100;

  let grade;
  let gradeClass;

  if (percentage >= 90) { grade = "A+"; gradeClass = "Aplus"; }
  else if (percentage >= 80) { grade = "A"; gradeClass = "A"; }
  else if (percentage >= 70) { grade = "B"; gradeClass = "B"; }
  else if (percentage >= 60) { grade = "C"; gradeClass = "C"; }
  else if (percentage >= 50) { grade = "D"; gradeClass = "D"; }
  else { grade = "F"; gradeClass = "F"; }

  const resultBox = document.getElementById("result");
  resultBox.style.display = "block";
  resultBox.className = "result " + gradeClass;

  resultBox.innerHTML = `
    <p><strong>Total Marks:</strong> ${total} / 500</p>
    <p><strong>Percentage:</strong> ${percentage.toFixed(2)}%</p>
    <p><strong>Grade:</strong> ${grade}</p>
  `;
}
