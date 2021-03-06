'use strict';

module.exports = CardContainer;

function CardContainer(data) {
    let cardWidth = 6;
    let cardHeight = 9;
    let cardDepth = 0.03;
    let cardCornerRadius = 0.5;
    let spacing = 1;
    let stackShattering = 'ordered'; //ordered, little, shattered

    this.setCardWidth = function(value) {
        cardWidth = value;
    };

    this.setCardHeight = function(value) {
        cardHeight = value;
    };

    this.setCardDepth = function(value) {
        cardDepth = value;
    };

    this.setCardCornerRadius = function(value) {
        cardCornerRadius = value;
    };

    this.setSpacing = function(value) {
        spacing = value;
    };

    this.setStackShattering = function(value) {
        stackShattering = value;
    };

    this.transformToFrontend = function(slotIndex) {
        return {
            cardWidth: cardWidth,
            cardHeight: cardHeight,
            cardDepth: cardDepth,
            cardCornerRadius: cardCornerRadius,
            spacing: spacing,
            stackShattering: stackShattering
        }
    };

    this.setCardWidth(data.cardWidth);
    this.setCardHeight(data.cardHeight);
    this.setCardDepth(data.cardDepth);
    this.setCardCornerRadius(data.cardCornerRadius);
    this.setSpacing(data.spacing);
    this.setStackShattering(data.stackShattering);
}