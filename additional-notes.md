# how to
## load async staff
use import function for dynamic/async import

## mount to container
useRef returns a mutable ref object whose .current property is initialized to the passed argument (initialValue). The returned object will persist for the full lifetime of the component.
.current property contains the link to specified by ref element
    div ref={ref} will become ref.current
    @version — 16.8.0

## extract shared dependencies
check config in browser network tab
    shorthand for long list if needed

## deploy in monorepository
CI/CD pipeline via github:
- defaults.run.working-directory    is default folder for steps run part

## config a aws bucket
- open aws s3
- _click'Create bucket'
- - General configuration/Bucket name='any-available-for-bucket-name-on-aws'
- - General configuration/Region=v'nearest aws region'
- - remember code f.e. 'us-east-1'
- - _click'Create bucket'
- available on s3.console.aws.amazon.com/s3/buckets/<bucket-name>
- - |Properties|
    Static website hosting/_click'Edit'
    Static website hosting/Static website hosting=_radio'Enable'
    Static website hosting/Hosting type=_radio'Host a static website'
    Static website hosting/Index document='index.html'                    (will be overwritten by other param)
    Static website hosting/Error document='index.html'                    (optional)
    Static website hosting/_click'Save changes'
- - |Permissions|
    Block public access (bucket settings)/_click'Edit'
    Block public access (bucket settings)/uncheck'Block all public access'
    Block public access (bucket settings)/_click'Save changes'
    Edit Block public access (bucket settings)/To confirm he settings, enter confirm in the field='confirm'
    Edit Block public access (bucket settings)/_click'Confim'
- - |Permissions|
    Bucket policy/_click'Edit'
    Edit bucket policy/Bucket policy/Bucket ARN=arn::aws:s3:::<bucket-name>  (copy-arn)
    Edit bucket policy/Bucket policy/_click'Policy generator'
    Step 1: Select Policy Type/Select Type of Policy=v'S3 Bucket Policy'
    Step 2: Add Statement(s)/Efect=_radio'Allow'
    Step 2: Add Statement(s)/Principal='*'
    Step 2: Add Statement(s)/Actions=v'GetObject'
    Step 2: Add Statement(s)/Amazon Resourse Name (ARN)=_paste-arn/*
    Step 2: Add Statement(s)/_click'Add Statement'
    should be added line in table
    Step 3: Generate Policy/_click'Generate Policy'
    copy-generated-policy
    Edit bucket policy/Bucket policy/Policy=_paste-generated-policy
    Edit bucket policy/Bucket policy/_click'Save changes'

- open aws CloudFront
- CloudFront Distributions/_click'Create Distribution'
- - Select a delivery method for your content/Web/_click'Get Started'           (step is not present in updated UI)
    Create Distribution / Origin Settings / Origin Domain Name =v'<bucket-name>'
    Create Distribution / Default Cache Behavior Settings / Viewer Protocol Policy =_radio'Redirect HTTP to HTTPS'
    Create Distribution / Distribution Settings / SSL Certificate =_radio'Defauy CloudFront Crtificate (*.cloudfront.net)'
    Create Distribution / _click'Create Distribution'          (after that new line will be added to the table where Status = In Progress; wait for Deployed)
- - open created distribution
|General| / _click'Edit'
    Edit Distribution / Distribution Settings / Default Root Object = '/container/latest/index.html
    Edit Distribution / Distribution Settings / _click'Yes, Edit'
|Error Pages| / _click'Create Custom Error Response'
    Create Custom Error Response / Create Custom Error Settings / HTTP Error Code = v'403: Forbidden' 
    Create Custom Error Response / Create Custom Error Settings / Customize Error Response = _radio'Yes' 
    Create Custom Error Response / Create Custom Error Settings / Response Page Path = '/container/latest/index.html'
    Create Custom Error Response / Create Custom Error Settings / HTTP Response Code = v'200: OK' 
    Create Custom Error Response / Create Custom Error Settings / _click'Create'          (after that new line will be added to the table)
|General| / Dmain Name = copy-url

- open aws IAM
_click'Access management/Users'(left menu)
_click'Add User'
    Add User / Set user details / User name* = <project-ci-user-name>
    Add User / Select AWS access type / Access type* = check'Programmatic access'
    Add User / _click'Next: Permissions'
    (all bucket & cloudfront permissions is bad practice)
    Add User / Set permission / _click'Attach existing policies directly'
    Add User / Filter policies = s3 / check'AmazonS3FullAccess'
    Add User / Filter policies = cloudfront / check'CloudFrontFullAccess'
    Add User / _click'Next: Tags'
    Add User / _click'Next: Review'
    Add User / _click'Create user'          (after that new line will be added to the table)
    copy'Access key ID'
    copy'Secret access key' (hidden, will be shown 1 time. If forgot, re-create user)

- open github repository
|Settings| 
_click'Secrets'(left menu)
Secrets / _click'New secret'
    Secrets / New secret / Name = <key-name>
    Secrets / New secret / Value = <key-value>
    Secrets / New secret / _click'Add secret'      (line added)

## fix white page screen
- make path to js consistent w/ bucket folder structure 
- add manual cache invalidation
- - open aws CloudFront
- - open created distribution
|Invalidations| / _click'Create Invalidation'
Create Invalidation / Object Paths = '/container/latest/index.html'
Create Invalidation / _click'Invalidate'       (line added. Status=In Progress; wait for Completed)

### automate invalidation
- add job to deployment config
invalidation will be added for every deployment

## add domain name github secret to use it as env variable
- copy domain name
- - open aws CloudFront
- - open created distribution
|General| / Domain Name          (copy-url)
- add PRODUCTION_DOMAIN env var as https://<copied-url>
- - open github repository
|Settings| / _click'Secrets'(left menu)
Secrets / _click'New secret'
    Secrets / New secret / Name = <key-name>
    Secrets / New secret / Value = <key-value>
    Secrets / New secret / _click'Add secret'      (line added)

## merge code changes after code review
git checkout -b container-dev
make changes
git status
git add .
git commit -m "Finished eature #1"
git push origin container-dev
- - open github repository
|Pull requests| / _click'New pull request'
|Code| / Comparing changes / _v'compare: container-dev'      (v'base: master' is autoselected)
|Code| / Comparing changes / _click'Create pull request'
|Code| / Open a pull request / _click'Create pull request'
|Pull requests| / Open a pull request / _click'Create pull request'     (title from commit message / description empty by default)
- - review changes
|Pull requests| / <commit-message> #1 / |Files changed| / _click'+' when hovered on line to leave comment (if needed )
|Pull requests| / <commit-message> #1 / |Files changed| / _click'+' when hovered on line to leave comment (if needed ) 
|Pull requests| / <commit-message> #1 / |Files changed| / _click'Start a review'
|Pull requests| / <commit-message> #1 / |Files changed| / _click'Finish your review' / (_radio'Comment' by default) / _click'Submit review'
- - resolve conversation
|Pull requests| / <commit-message> #1 / |Conversation|                        (added review shown)
|Pull requests| / <commit-message> #1 / |Conversation| / _click'Resolve conversation'
- - merge
|Pull requests| / <commit-message> #1 / |Conversation| / _click'Merge pull request'
|Pull requests| / <commit-message> #1 / |Conversation| / _click'Confirm merge'
|Pull requests| / <commit-message> #1 / |Conversation| / _click'Delete branch' (if needed)
- - pull merged
git checkout master
git pull origin master

## fix css class name collision using material-ui
use createGenerateClassName w/ specified prefix in every subproject
jss<N> will be replaced by <prefix-name><N> 

## use MemoryHistory in routing
use passed MemoryHistory object in App component instead of BrowserRouter
- setup communication between container and subapp
pass callback function to subapp in options object
use passed callback function in MemoryHistory navigation listener

## sync History objects
### subapp navigation (8080: click on link to subbapp page)
- destruct pathname prop from event
- rename it for better understanding
- use browser history object
- update browser url after subapp navigation |   |   | one direction communication
- fix onNavigate undefined error on running in isolation on port 8081
### container navigation (8080: click on link to subbapp page; 8080: click on header link to home page)
- declare parent navigation callback
- implement callback
- use callback on conainer listening event
- fix update browser url on running in isolation on port 8081: 
1) setup browser history; 
2) use it on mounting if provided in isolation as default history

## add authentication
`npm start` to run empty subapp in isolation on port 8082

webpack dev config to open pages on localhost in isolation (8080, 8081, 8082) :
- output.publicPath should end with /
- output.publicPath port should be equal to devServer.port

## fix direct route access
404 errors on directly accessing http://localhost:8081/pricing
1 way - add / before index.html
devServer: {
    port: 8082,
    historyApiFallback: {
      index: "/index.html",
    },
  },
2 way - use true instead of options
devServer: {
    port: 8082,
    historyApiFallback: true,
  },

## add initial state to memory history
current path from history object as initial state

## lazy loading
- use lazy function to import on demand & return react component
- wrap Switch component w/ Suspense component where fallback means layout to show on loading
- check results in Network tab of browser F12 tools

## apps communication
pass callback from container & receive it in subapp
pass callback from subapp & receive it in component



