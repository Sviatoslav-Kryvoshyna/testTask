Feature: To Do Feature

  Scenario: User can add new To Do
    Given user open To Do app
    When user add To Do "test1"
    Then To Do "test1" is added

  Scenario: User can delete To Do
    Given user open To Do app
    When user add To Do "test2"
    When delete icon next to "test2" was clicked
    Then To Do "test2" is deleted

Scenario: User can check To Do item
    Given user open To Do app
    When user add To Do "test3"
    And check "test3" item
    Then item "test3" become checked


