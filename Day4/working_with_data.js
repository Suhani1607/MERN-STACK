const skills=[
   {Name: "HTML" ,proficiency: " Advanced "},
   { Name :"CSS" ,proficiency:  "Advanced"},
    {Name: "JavaScript" ,proficiency: "Intermediate"},
   { Name: "ReactJS" ,proficiency: "Intermediate"},
]

const showSkills=skills.map(skill=>
    `${skill.Name}(${skill.proficiency})`
)

console.log(showSkills);