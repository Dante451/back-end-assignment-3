# Debugging Analysis

## Scenario 1: [Middleware 404]

-   **Breakpoint Location:** [errorMiddleware.test.ts (Line 9)]
-   **Objective:** [The purpose of this test is to go down the list is to make sure
                    the tests are working and that when a non-existent route is provided, the error is caught]

### Debugger Observations

-   **Variable States:** [const res: /api/v1/unknown-route]
-   **Call Stack:** [Begins test with describing, then follows up with an intentional invalid route, 
                    the error number (404), and what it should return when the error is caught]
-   **Behavior:** [At this point, the debugger does not encounter any errors, 
                    indicating that the test is working as intended.]

### Analysis

-   There appears to be an error with this test, as the debugger never confirms it is working.
-   I observed the debugger getting to the breakpoint and stopping, I am unsure if that is a positive or a negative.
-   I believe I wrote a solid test, but it is possible I overlooked something.
-   To confirm this was or was not working, I moved the breakpoint to the next part of the test and did not notice a difference.
    This leads me to believe the test is successful. 

## Scenario 2: [Middleware 400]

-   **Breakpoint Location:** [errorMiddleware.test.ts (Line 17)]
-   **Objective:** [The purpose of this test is to go down the list is to make sure
                    the tests are working and that when a incorrect data is provided, the error is caught]

### Debugger Observations

-   **Variable States:** [const res: /api/v1/unknown-route]
-   **Call Stack:** [Begins test with describing, then the 404 test, then follows up with an intentional invalid data entry, 
                    the error number (400), and what it should return when the error is caught]
-   **Behavior:** [At this point, the debugger stops and does not appear to have an error]

### Analysis

-   There was an issue with the previous test, and I had accidentally setup my test incorrectly.
-   I observed the debugger getting to the breakpoint and stopping, indicating the test was successful.
-   I wrote a good test, but the first test is incorrect and should be looked at.
-   I confirmed this by removing the breakpoint and running the suite, confirming 404 is broken but 400 is okay.

## Scenario 3: [Title of the Scenario]

[Repeat the same format as Scenario 1]