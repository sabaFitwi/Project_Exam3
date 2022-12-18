/**
 * An error handling function. The error message sent by the browser or API should be the message parameter.
 * @param {string} message the error message to be displayed
 * @returns a container used to display the error in the DOM
 *
 */

export function displayError(message = "unexpected error") {
  return ` <div class="error p-3 mx-auto my-1 w-80 danger"><strong>Error</strong>- ${message}
</div>`;
}
