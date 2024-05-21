Feature: Ecommerce validation


    @RegressionTC
    Scenario: Ecommerce TestCase
        Given Login to Ecommerce app with "fname@gmail.com" and "Fname@1234"
        When Add "IPHONE 13 PRO" to cart
        Then Verify "IPHONE 13 PRO" is displayed in the cart
        When Enters valid details and place the order
        Then Verify order placed in myorder page