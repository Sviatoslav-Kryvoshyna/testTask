Feature: API

Scenario: Check GET request
    Given user make GET request to "https://jsonplaceholder.typicode.com/posts/1"
    When user receive response
    Then user get correct response                                                                                                                                                         

Scenario: Check POST request
    Given user make POST requsts to "https://jsonplaceholder.typicode.com/posts" with body title: "foo", body: "bar", userId: 1
    When user receive response
    Then response status is 201 and id: 101 

Scenario: Cheeck PUT request
    Given user make PUT requsts to "https://jsonplaceholder.typicode.com/posts/1" with body id: 1 , title: "foo", body: "bar", userId: 1
    When user receive response
    Then response status is 200 and response: id: 1 , title: "foo", body: "bar", userId: 1