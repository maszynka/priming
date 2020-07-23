# Priming Experiment App
This app was use as an experimental quiz for an Wroclaw SWPS student's experiment at 2020.

App consist of:
- UI app
- server app
- results parser

## UI Features:
- Randomisation of primed/non-primed groups by checking if user entry timestamp is even or not
- System measurements (that let's you to exclude potencially non-representative results)
  - benchamark measurement of fps (average and minimal)
  - User Agent (experiment didn't work on desktop safari) and resolution
- Exposing primed words at configured time (currently 30ms) just about the place user click's
(that increases chance user is looking and focusing at the place of priming). 
This must be equal or lower to max fps of user display 
(most likely 60fps, which gives 1000ms/60 ~ 17ms minimal exposure time)
- Measurement of arousal and pleasure as last question.
- App uses pure js, without any rendering middleware and fastest way on browsers, 
to my knowladge, to render elements/text nodes.

### Server features:
- Gathering and validating results
- Checking if answers were gathered from appropriate group
- You can configure, together with UI, separate groups (currently are five) to post on different social-media groups,
by giving them to different user groups you are able to later check if there might not by any flaws within some group
(that might suggest factoring results)

### Parser: 
- Flat's and merges results from different groups
- Can make basic pre-validation of results by putting additional property in answer object
when user do not match some criteria (like average fps < 55fps, min < 50, UserAgent match
regex for desktop Safari) but this one was'nt included in this version
- parse JSON results to CSV 

## App tests:
- App was tested to work on few mobile devices using slo-mo 1000 fps camera (Xiaomi Mi Note 10).
- Users of primed group didn't notice 