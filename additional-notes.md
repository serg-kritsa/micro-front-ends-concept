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
