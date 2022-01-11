// testing 
const qbox = document.querySelector(".question");
const high = document.querySelector(".high")

let number = 0;
var score = 0;
const questions =
{
    "Q": [
        {

            "Ques": "Most popular langauage for data science",
            "1": "Javascript",
            "2": "Python",
            "3": "Java",
            "Correct": "Python"
        },
        {

            "Ques": "Most loved language of 2021",
            "1": "C++",
            "2": "Scala",
            "3": "SQL",
            "Correct": "Scala"
        },
        {

            "Ques": "Google official language for android development",
            "1": "Kotlin",
            "2": "Python",
            "3": "Java",
            "Correct": "Kotlin"
        },
        {

            "Ques": "Kend C Dodd is co-founder of: ",
            "1": "Svelete",
            "2": "Remix",
            "3": "Angular",
            "Correct": "Remix"
        },
        {

            "Ques": "Most popular front end framework",
            "1": "React",
            "2": "Vue",
            "3": "Angular",
            "Correct": "React"
        }

    ]

}

const generate = () => {
    qbox.innerHTML = ""
    let text = ""

    // {
    text += `<h1>${questions.Q[number]["Ques"]}</h1>
        <p class = "op">${questions.Q[number][1]}</p>
        <p class = "op">${questions.Q[number][2]}</p>
        <p class = "op">${questions.Q[number][3]}</p>
        
        `

    qbox.innerHTML = text

}
generate();

let chosen = document.querySelectorAll(".op")

const choose = (e) => {

    if (questions.Q[number].Correct == e.currentTarget.innerText) {

        score += 10;
        if (number < 4) {

            number++;
            generate();
            let chosen = document.querySelectorAll(".op")

            for (let index = 0; index < chosen.length; index++) {

                chosen[index].addEventListener('click', choose);

            }

        }
        else if (number >= 4) {
            qbox.innerHTML = ""
            qbox.innerHTML = `<h1>Game End</h1>
           
            <h2>Score: ${score}</h2>
            <div class = "name">
            <label for="fname">Name </label>
            <input type="text" class = "userName" id="fname" name="fname"> 
            </div>
            <button class = "submit">Submit</button>`
            const submit = document.querySelector(".submit")
            const input = document.getElementById("fname")
            submit.addEventListener('click', () => {
                var myName = input.value;

                let pushIt = { name: myName, "score": score }
                let sc = JSON.parse(localStorage.getItem("scores"))
                sc.push(pushIt);
                localStorage.setItem("scores", JSON.stringify(sc));
                input.value = ""
                document.location.reload(true)

            })
        }


    }
    else {
        if (number < 4) {
            number++;
            generate();
            let chosen = document.querySelectorAll(".op")
            for (let index = 0; index < chosen.length; index++) {
                chosen[index].addEventListener('click', choose);

            }
        }
        else if (number >= 4) {
            qbox.innerHTML = ""
            qbox.innerHTML = `<h1>Game End</h1>
            <h2>Score: ${score}</h2>
            <div class = "name">
            <label for="fname">Name </label>
            <input type="text" id="fname" class = "userName" name="fname">
             
            </div>
            <button class = "submit">Submit</button>`
            const submit = document.querySelector(".submit")
            const input = document.getElementById("fname")
            submit.addEventListener('click', () => {
                var myName = input.value;
                let pushIt = { name: myName, "score": score }
                let sc = JSON.parse(localStorage.getItem("scores"))
                sc.push(pushIt);
                // localStorage.clear();
                localStorage.setItem("scores", JSON.stringify(sc));
                input.value = ""
                document.location.reload(true)

            })
        }
        if (score > 0) {
            score = score - 10;

        }
    }

}
for (let index = 0; index < chosen.length; index++) {

    chosen[index].addEventListener('click', choose);

}
const showScores = () => {
    qbox.innerHTML = ""
    let sc = JSON.parse(localStorage.getItem("scores"))

    sc.sort(function (a, b) {
        return b.score - a.score;
    });
    console.log(sc)
    for (let index = 0; index < 3; index++) {

        qbox.innerHTML += `<h1>${sc[index].name.toUpperCase()}: ${sc[index].score}</h1>`
    }
}
high.addEventListener("click", showScores)

