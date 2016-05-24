(function(){
  addEventListener("DOMContentLoaded", function(){
    questions = [
      {
        question: "Which agricultural product most interests you?",
        answers: [
          {
            answer: makeCaptionImage("1a.jpg", "Silk Worms"),
            result: "China"
          },
          {
            answer: makeCaptionImage("1b.jpg", "Grapes"),
            result: "Rome"
          },
          {
            answer: makeCaptionImage("1c.jpg", "Rice"),
            result: "India"
          }
        ]
      },
      {
        question: "What kind of house would you rather live in?",
        answers: [
          {
            answer: makeCaptionImage("2a.jpg", "Rammed earth"),
            result: "China"
          },
          {
            answer: makeCaptionImage("2b.jpg", "Wooden"),
            result: "Rome"
          },
          {
            answer: makeCaptionImage("2c.jpg", "Carved Stone"),
            result: "India"
          }
        ]
      },
      {
        question: "What kind of art do you most appreciate?",
        answers: [
          {
            answer: makeText("Intricate calligraphy"),
            result: "China"
          },
          {
            answer: makeText("Realistic Marble Busts"),
            result: "Rome"
          },
          {
            answer: makeText("Detailed Pottery"),
            result: "India"
          }
        ]
      },
      {
        question: "What role does religion play in your everyday life?",
        answers: [
          {
            answer: makeText("Who I vote for"),
            result: "China"
          },
          {
            answer: makeText("What media I consume"),
            result: "Rome"
          },
          {
            answer: makeText("Who I hang out with"),
            result: "India"
          }
        ]
      },
      {
        question: "What do you most look for in a leader?",
        answers: [
          {
            answer: makeText("Emperor who is given divine right"),
            result: "China"
          },
          {
            answer: makeText("Emperor given legitimacy by powerful army"),
            result: "Rome"
          },
          {
            answer: makeText("Central government not as important as social rank"),
            result: "India"
          }
        ]
      },
      {
        question: "In your mind, how should those in government be selected?",
        answers: [
          {
            answer: makeText("By a rigorous test of merit"),
            result: "China"
          },
          {
            answer: makeText("By family association and reputation"),
            result: "Rome"
          },
          {
            answer: makeText("By birth-given social caste"),
            result: "India"
          }
        ]
      },
      {
        question: "What would most fairly determine someone’s rank in society?",
        answers: [
          {
            answer: makeText("How much land they own"),
            result: "China"
          },
          {
            answer: makeText("Whether they belong to an aristocratic elite"),
            result: "Rome"
          },
          {
            answer: makeText("The social caste of their parents"),
            result: "India"
          }
        ]
      },
      {
        question: "To what extent is slavery acceptable?",
        answers: [
          {
            answer: makeText("OK, as long as it's not the primary source of labor"),
            result: "China"
          },
          {
            answer: makeText("Completely tolerable to enslave conquered peoples"),
            result: "Rome"
          },
          {
            answer: makeText("It’s fine, but slaves should be treated in a humanitarian fashion"),
            result: "India"
          }
        ]
      },
      {
        question: "What are you most likely to sell to faraway lands?",
        answers: [
          {
            answer: makeText("Luxurious silk garments"),
            result: "China"
          },
          {
            answer: makeText("Basic goods such as metals, carpets, and glass"),
            result: "Rome"
          },
          {
            answer: makeText("Spices and cloths"),
            result: "India"
          }
        ]
      }
      // {
      //   question: "",
      //   answers: [
      //     {
      //       answer: makeText(""),
      //       result: "China"
      //     },
      //     {
      //       answer: makeText(""),
      //       result: "Rome"
      //     },
      //     {
      //       answer: makeText(""),
      //       result: "India"
      //     }
      //   ]
      // }
    ]

    function makeText(text){
      return only.html({p: text,
        css: {
          cursor: "pointer"
        }});
    }

    function makeImage(name){
      return only.html({img: "", src: "images/"+name,
      css: {
        height: "200px",
        cursor: "pointer"
      }})
    }

    function makeCaptionImage(img, text){
      return only.html({
        div: [
          makeImage(img),
          makeText(text)
        ]
      })
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
          {h1: question.question},
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
          frameBorder: "0",
          css: {
            width: "100%",
          }});
        frame.addEventListener("load", function(){
          frame.style.height = frame.contentWindow.document.body.scrollHeight + 100 + "px";
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
          [{p: "Thanks for playing!"},
            getExplanationPage(result)]
          .concat(givenAnswers.map(function(answer){
            return only.html({
              div: [
                {b: [
                  {p: "Q: " + answer.question},
                ]},
                {p: "Given answer:"},
                answer.answer,
                {p: "Country:"},
                {p: answer.result}
              ]
            });
          })),
          // .concat([getExplanationPage(result)])),
          class: "text-center",
          css: {
            margin: "0 auto"
          }
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
