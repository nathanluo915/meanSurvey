# meanSurvey

# meanSurvey is a simple multiple choice survey creation and survey taking application.

For more agile user experience when creating survey, user are able to dynamically add/remove questions or answers. All fields are being validated before sending to the server when submitting the form. To allow these interactions I used AngularJs (ver. 1.4.8) to dynamically add directives, which insert nested models to the scope.

In the back end it is Node.Js with Express framework for API server. Basic RESTful routes are builted, along with MongoDB to store data.

Due to the fact that the front end will send a batch of information to the back end, I could not use Mongoose as an object modeling tool to create models, since Mongoose does not support batch insertion. At the end I used MongoDB native driver for Node.Js to support data storage and manipulation.
