Testing
=======

This directory contains a single level of tests, to be expanded in the future:

## Component tests (`test/component`)

The "component" here is the service as a whole. These tests should:

### 1. Test the service as a black box
This means essentially calling the api then making assertions on one of more of:

* The response
* Calls made to external services
* State changes in fake databases

