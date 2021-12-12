/* global document, window, metamask */

async function loginwithtoken(token,account,next){
    try {
      const from = account;
      let message = token;
      const sign = await ethereum.request({
        method: 'personal_sign',
        params: [message, from,''],
      });
      var res = sign
    } catch (err) {
      console.error(err);
    }

    fetch('/accounts/metamask/login/', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    "X-CSRFToken": '{{ csrf_token }}',
  },
  body: JSON.stringify({
            account: account,
            login_token: res,
            next : next,
            process: 'verify',
        })
})
  .then(function (response) {
	// The API call was successful!
	return response.text();
}).then(function (html) {

	// Rewrite the page with fetch response
	document.querySelector('html').innerHTML = html

}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
});
  // window.location.href = next;
}

async function getAccount(next, process="redirect") {
  const accounts = await ethereum.request({method: 'eth_requestAccounts'});
  const account = accounts[0];
  fetch('/accounts/metamask/login/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "X-CSRFToken": '{{ csrf_token }}',
    },
    body: JSON.stringify({
      account: account,
      next: next,
      process: process,
    })
  })
  .then((response) => response.json())
  .then((responseJson) => {
    loginwithtoken(responseJson.data, account, next)
  })
}

