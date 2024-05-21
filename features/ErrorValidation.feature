Feature: Ecommerce validation


    @ValidationTC
    Scenario Outline: Scenario Outline name: Ecommerce TestCase
        Given Login to Ecommerce2 app with "<user>" and "<pass>"
        Then Verify Error message


        Examples:
            | user            | pass      |
            | rahulshettyacad | learnings |