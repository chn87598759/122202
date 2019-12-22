// file: script.js
// Initialize Firebase
var config = {
    apiKey: "AIzaSyC6ywoEyIBZJfXLLhVOPxQTcGH5j5UrZlM",
    authDomain: "project-4549069553915091068.firebaseapp.com",
    databaseURL: "https://project-4549069553915091068.firebaseio.com",
    projectId: "project-4549069553915091068",
    storageBucket: "project-4549069553915091068.appspot.com",
    messagingSenderId: "951960983851"
};
firebase.initializeApp(config);

//create firebase database reference
var dbRef = firebase.database();
var contactsRef = dbRef.ref('contacts');

//load older conatcts as well as any newly added one...
contactsRef.on("child_added", function(snap) {
  console.log("added", snap.key, snap.val());
  $('#contacts').append(contactHtmlFromObject(snap.val()));
});

//save contact
$('.addValue').on("click", function( event ) {  
    event.preventDefault();
    if( $('#name').val() != '' || $('#email').val() != '' ){
      contactsRef.push({
        name: $('#name').val().replace(/<[^>]*>/ig, ""),
        email: $('#email').val().replace(/<[^>]*>/ig, ""),
        location: {
          city: $('#city').val().replace(/<[^>]*>/ig, ""),
          state: $('#state').val().replace(/<[^>]*>/ig, ""),
          zip: $('#zip').val().replace(/<[^>]*>/ig, "")
        }
      })
      contactForm.reset();
    } else {
      alert('Please fill atlease name or email!');
    }
  });

//prepare conatct object's HTML
function contactHtmlFromObject(contact){
  console.log( contact );
  var html = '';
  html += '<li class="list-group-item contact">';
    html += '<div>';
      html += '<p class="lead">'+contact.name+'</p>';
      html += '<p>'+contact.email+'</p>';
      html += '<p><small title="'+contact.location.zip+'">'+contact.location.city+', '+contact.location.state+'</small></p>';
    html += '</div>';
  html += '</li>';
  return html;
}
