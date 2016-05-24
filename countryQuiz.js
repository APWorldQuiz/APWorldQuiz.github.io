(function(){
  addEventListener("DOMContentLoaded", function(){
    questions = [
      {
        question: "Which agricultural product most interests you?",
        answers: [
          {
            answer: makeImage("silkworms.jpg"),
            result: "China"
          },
          {
            answer: makeText("Grapes"),
            result: "Rome"
          },
          {
            answer: makeText("Rice"),
            result: "India"
          }
        ]
      },
      {
        question: "What kind of house would you rather live in?",
        answers: [
          {
            answer: makeText("Rammed earth"),
            result: "China"
          },
          {
            answer: makeText("Wooden"),
            result: "Rome"
          },
          {
            answer: makeText("Carved Stone"),
            result: "India"
          }
        ]
      }
    ]

    function makeText(text){
      return only.html({p: text});
    }

    function makeImage(name){
      return only.html({img: "", src: "images/"+name,
      css: {
        height: "200px",
      }})
    }

    function makeQuestionPage(question, callback){

      var letters = "ABCDEFGHIJKLMNOP";
      var currentLetter = 0;
      function makeNextAnswerButton(answer, result){
        var letter = letters[currentLetter++];
        // var button = only.html({button: letter});
        answer.addEventListener("click", function(){
          callback({
            question: question.question,
            answer: answer,
            result: result
          })
        })
        return only.html({
          div: [answer],
        })
      }
      function getAnswer(answer){
        return makeNextAnswerButton(answer.answer, answer.result);
      }
      var answers = question.answers.map(getAnswer);
      return only.html({
        div: [
          {p: question.question},
          {div: answers},
        ],
        css: {
          margin: "0 auto",
          "text-align": "center"
        }
      })
    }

    function makeGameRunner(questions){
      var givenAnswers = []
      function buttonCallback(answer){
        givenAnswers.push(answer);
        next();
      }
      function makePage(question){
        return makeQuestionPage(question, buttonCallback);
      }
      var pages = questions.map(makePage);
      var currentPage = 0;
      function next(){
        currentPage += 1;
        if (pages.length == currentPage){
          endGame();
        } else {
          only.setHtml(pages[currentPage]);
        }
      }
      function start(){
        only.setHtml(pages[0])
      }
      function mode(array)
      {
        if(array.length == 0)
        return null;
        var modeMap = {};
        var maxEl = array[0], maxCount = 1;
        for(var i = 0; i < array.length; i++)
        {
          var el = array[i];
          if(modeMap[el] == null)
          modeMap[el] = 1;
          else
          modeMap[el]++;
          if(modeMap[el] > maxCount)
          {
            maxEl = el;
            maxCount = modeMap[el];
          }
        }
        return maxEl;
      }
      function getExplanationPage(mode){
        var name = "";
        console.log(mode === "China");
        switch(mode){
          case "China":
            name = "china.html";
            break;
          case "India":
            name = "india.html";
            break;
          case "Rome":
            name = "rome.html";
            break;
        }
        var frame = only.html({iframe: "not found", src: name,
          css: {
            width: "100%",
          }});
        frame.addEventListener("load", function(){
          frame.style.height = frame.contentWindow.document.body.scrollHeight + "px";
        });
        window.fr = frame;
        return frame;
      }
      function endGame(){
        var finalResults = givenAnswers.map(function(answer){
          return answer.result;
        })
        var result = mode(finalResults);
        only.setHtml({
          div:
          [{p: "Thanks for playing!"}]
          .concat(givenAnswers.map(function(answer){
            return only.html({
              div: [
                {b: [
                  {p: "Q: " + answer.question},
                ]},
                {p: "given answer:"},
                answer.answer,
                {p: "Country:"},
                {p: answer.result}
              ]
            });
          }))
          .concat([getExplanationPage(result)])
        });
      }
      return {
        start: start
      }
    }

    var startButton = only.html({button: "START"});
    startButton.addEventListener("click", function(){
      var runner = makeGameRunner(questions);
      runner.start();
    })

    var startPage = only.html({
      div: [
        {h1: "Which Ancient Civilization Are You??"},
        startButton
      ],
      css: {
        width: "800px",
        margin: "0 auto",
        "padding-top": "100px"
      },
      class: "text-center"
    })

    only.setHtml(startPage);
  })
})()
