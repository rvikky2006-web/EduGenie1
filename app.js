async function submitTask() {

    const task =
        document.getElementById("task").value;

    const text =
        document.getElementById("inputText").value.trim();

    const result =
        document.getElementById("result");


    if (!text) {

        result.innerText =
            "Please enter a question or topic.";

        return;
    }


    result.innerText =
        "Generating answer...";


    let url = "";
    let body = {
        text: text
    };


    if (task === "qa") {

        url = "/qa";

    }

    else if (task === "explain") {

        url = "/explain/";

    }

    else if (task === "quiz") {

        url = "/quiz";

        body = {
            topic: text,
            num_questions: 5
        };

    }

    else if (task === "summary") {

        url = "/summarize";

    }

    else if (task === "learning") {

        url = "/learn/recommendations";

    }


    try {

        const response =
            await fetch(url, {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify(body)

            });


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.detail || "Request failed"
            );

        }


        if (task === "qa") {

            result.innerText =
                data.answer;

        }

        else if (task === "explain") {

            result.innerText =
                data.explanation;

        }

        else if (task === "summary") {

            result.innerText =
                data.summary;

        }

        else if (task === "learning") {

            result.innerText =
                data.recommendations;

        }

        else if (task === "quiz") {

            displayQuiz(data.quiz);

        }

    }

    catch (error) {

        result.innerText =
            "Error: " + error.message;

    }

}


function displayQuiz(quiz) {

    const result =
        document.getElementById("result");

    result.innerHTML = "";


    quiz.forEach((item, index) => {

        const question =
            document.createElement("div");

        question.innerHTML = `

            <h3>
                ${index + 1}. ${item.question}
            </h3>

            <ul>
                ${item.options
                    .map(option =>
                        `<li>${option}</li>`
                    )
                    .join("")}
            </ul>

            <b>Answer:</b>
            ${item.answer}

            <p>
                ${item.explanation || ""}
            </p>

            <hr>
        `;

        result.appendChild(question);

    });

}