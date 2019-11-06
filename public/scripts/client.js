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
            <span>${tweetData.content.text}</span>      
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
      alert("It cannot be empty")
    } else if (contentLength > 140) {
      alert('The number of characters should be less than 140')
    } else {
      console.log('posting')
      $.ajax({
        type: 'POST',
        url: '/tweets',
        data: $content,
        //dataType: 'json',
        success: function (res) {
          $("#tweet-dynamic-container").prepend(createTweetElement(res))
        },
        failure: err => console.error(err)
      });
    }
  });

  loadtweets();

  $(".fa-angle-double-down").on('click', function(){
    $('#text').focus();
    
  })
});