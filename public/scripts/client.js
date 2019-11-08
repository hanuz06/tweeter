/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// --- our code goes here ---

let timeSince = function (date) {
  if (typeof date !== 'object') {
    date = new Date(date);
  }

  let seconds = Math.floor((new Date() - date) / 1000);
  let intervalType;

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    intervalType = 'year';
  } else {
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      intervalType = 'month';
    } else {
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        intervalType = 'day';
      } else {
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
          intervalType = "hour";
        } else {
          interval = Math.floor(seconds / 60);
          if (interval === 0) {
            intervalType = 'a moment';
          } else if (interval >= 1) {
            intervalType = "minute";
          } else {
            interval = seconds;
            intervalType = "second";
          }
        }
      }
    }
  }

  if (interval === 0) {
    return intervalType;
  } else {
    intervalType += 's';
    return interval + ' ' + intervalType;
  }
};

const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function (tweetData) {

  let newTime = timeSince(new Date(tweetData.created_at));

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
              <span>${newTime} ago</span>
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
};

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
    success: (data => renderTweets(data))
  });
};

$(document).ready(function () {

  const $onSubmit = $('#tweet-form');
  $onSubmit.on("submit", function (e) {
    e.preventDefault();

    let $content = $('#tweet-form').serialize();

    let contentLength = $('#tweeter-text').val().length;
    if (!contentLength) {
      $("#error span").text("It cannot be empty");
      $("#error").slideDown(200);
    } else if (contentLength > 140) {
      $("#error span").text("The number of characters should be less than 140");
      $("#error").slideDown(200);
    } else {
      $(".counter").replaceWith('<span class="counter">140</span>');
      $("#tweeter-text").val('');
      $("#error span").text("");
      $("#error").slideUp(200);

      $.ajax({
        type: 'POST',
        url: '/tweets',
        data: $content,
        success: function (res) {
          $("#tweet-dynamic-container").prepend(createTweetElement(res));
        }
      });
    }
  });

  loadtweets();

  $(".fa-angle-double-down").on("click", function () {
    $('.new-tweet').slideToggle(300);
    $('#tweeter-text').focus();
    $("#tweeter-text").val('');
    $("#error span").text("");
    $("#error").slideUp();
  });

  $("#myBtn").click(function () {
    $("html").animate({
        scrollTop: 0
      },
      800);
    $('.new-tweet').show(200);
    $('#tweeter-text').focus();
  });


  // When the user scrolls down from the top of the document, show the button
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    //let height = document.documentElement.clientHeight;

    if ($(window).scrollTop() + $(window).height() - $(document).height() > -100) {
      $("#myBtn").css('display', 'block');
      $(".fa-angle-double-down").css('display', 'none');
    } else {
      $("#myBtn").css('display', 'none');
      $(".fa-angle-double-down").css('display', 'block');
    }
  }
});