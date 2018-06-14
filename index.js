'use strict';

const Alexa = require('ask-sdk');
const request = require('request');

const BASE_URL = process.env.BASE_URL || 'https://localhost';
const url = `${BASE_URL}/ac`

function putForm(form) {
  return request.put(url, { form });
}

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = 'Welcome to the air conditioner control, you can say power on!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('AC Control', speechText)
      .getResponse();
  },
};

const PowerOnIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'PowerOn';
  },
  handle(handlerInput) {
    const speechText = 'Powering on.';

    putForm({ power: 'on' });

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(speechText, speechText)
      .getResponse();
  },
};

const PowerOffIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'PowerOff';
  },
  handle(handlerInput) {
    const speechText = 'Powering off.';

    putForm({ power: 'off' });

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(speechText, speechText)
      .getResponse();
  },
};

const ModeCoolIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'ModeCool';
  },
  handle(handlerInput) {
    const speechText = 'Changing to cool mode.';

    putForm({ mode: 'cool' });

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(speechText, speechText)
      .getResponse();
  },
};

const ModeDryIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'ModeDry';
  },
  handle(handlerInput) {
    const speechText = 'Changing to dry mode.';

    putForm({ mode: 'dry' });

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(speechText, speechText)
      .getResponse();
  },
};

const ModeHeatIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'ModeHeat';
  },
  handle(handlerInput) {
    const speechText = 'Changing to heat mode.';

    putForm({ mode: 'heat' });

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(speechText, speechText)
      .getResponse();
  },
};

const TempUpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'TempUp';
  },
  handle(handlerInput) {
    const speechText = 'Turning up temperature.';

    putForm({ temp: 'up' });

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(speechText, speechText)
      .getResponse();
  },
};

const TempDownIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'TempDown';
  },
  handle(handlerInput) {
    const speechText = 'Turning down temperature.';

    putForm({ temp: 'down' });

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(speechText, speechText)
      .getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'You can say power on, power off or cool mode and more!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('AC Control', speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    PowerOnIntentHandler,
    PowerOffIntentHandler,
    ModeDryIntentHandler,
    ModeCoolIntentHandler,
    ModeHeatIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
)
  .addErrorHandlers(ErrorHandler)
  .lambda();
