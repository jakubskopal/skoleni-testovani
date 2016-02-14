## To run this test, execute:

```bash
npm install
npm start
```

## You should see:

```
> @ start .....
> webdriver-manager update && grunt

selenium standalone is up to date.
chromedriver is up to date.
Running "protractor_webdriver:run" (protractor_webdriver) task
Starting Selenium server
Started Selenium server: http://127.0.0.1:4444

Running "protractor:run" (protractor) task
Using the selenium server at http://localhost:4444/wd/hub
[launcher] Running 1 instances of WebDriver
Session created: count=1, browserName=chrome
Started
.


1 spec, 0 failures
Finished in 4.412 seconds
Session deleted: Going to shut down the Selenium server
Shutting down Selenium server: http://127.0.0.1:4444
Shut down Selenium server: http://127.0.0.1:4444 (OKOK)
[launcher] 0 instance(s) of WebDriver still running
[launcher] chrome #1 passed

Done, without errors.
```
