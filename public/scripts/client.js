/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// --- our code goes here ---


const data = [{
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1573022863112
  }
]

const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const createTweetElement = function (tweetData) {
  return (`
      <article class='tweet'>
        <header class="header">
          <div class="header__user">
            <div class="header__user__avatar">
              <img src="${tweetData.user.avatars}">
            </div>
            <div class="header__user__name">
              <h2>${tweetData.user.name}</h2>
            </div>
          </div>
          <div class="header__user__id">
           <span>${tweetData.user.handle}y</span> 
          </div>
        </header>
  
        <main class="user-tweeter">
          <div class="user-tweeter__text">
            <span>${escape(tweetData.content.text)}</span>      
          </div>
        </main>
  
        <footer class="footer">
          <div class="time-ago">
              <span>${tweetData.created_at}</span>
          </div>
          <div class="footer__links">
            <div class="footer__links__icon">
              <a href="#"><i class="fas fa-flag"></i></a>
            </div>
            <div class="footer__links__icon">
              <a href="#"><i class="fas fa-retweet"></i></a>
            </div>
            <div class="footer__links__icon">
              <a href="#"><i class="fas fa-thumbs-up"></i></a>
            </div>
          </div>
        </footer> 
      </article>      
    `);
}

const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container

  tweets.reverse();
  tweets.forEach(tweet => {
    $('#tweet-dynamic-container').append(createTweetElement(tweet));
  });
};

const loadtweets = function () {
  $.ajax({
    url: '/tweets',
    dataType: 'json',
    success: (data => renderTweets(data)),
    failure: (err => console.error(err))
  });
}


$(document).ready(function () {
  let onChange;

  const $onSubmit = $('#tweet-form');
  $onSubmit.on("submit", function (e) {
    e.preventDefault()
    console.log('Button clicked, performing ajax call...');

    let $content = $('#tweet-form').serialize();

    let contentLength = $('#text').val().length;
    if (!contentLength) {
      $("#error span").text("It cannot be empty")
      $("#error").show()
    } else if (contentLength > 140) {
      $("#error span").text("The number of characters should be less than 140")
      $("#error").show()
    } else {
      $("#error span").empty()
      $("#error").hide()

      $.ajax({
        type: 'POST',
        url: '/tweets',
        data: $content,
        //dataType: 'json',
        success: function (res) {
          $("#tweet-dynamic-container").prepend(createTweetElement(res))
          $("#text").val('');
          $("#error span").text("")
          $("#error").hide()
        },
        failure: err => console.error(err)
      });
    } 
  });

  loadtweets();

  $(".fa-angle-double-down").on("click", function () {
    $('.new-tweet').toggle()
    $('#text').focus();

  })


  // $("#myBtn").click(function () {
  //   var mybutton = document.getElementById("myBtn");

  //   // When the user scrolls down 20px from the top of the document, show the button
  //   window.onscroll = function () {
  //     scrollFunction()
  //   };

  //   function scrollFunction() {
  //     if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
  //       mybutton.style.display = "block";
  //     } else {
  //       mybutton.style.display = "none";
  //     }
  //   }

  //   // When the user clicks on the button, scroll to the top of the document
  //   function topFunction() {
  //     document.body.scrollTop = 0;
  //     document.documentElement.scrollTop = 0;
  //   }

  // });
})