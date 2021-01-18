import gtag from "./gtag";

export interface AnalyticsAuthValues {
  method?: string;
}

export interface AnalyticsEvent {
  login: AnalyticsAuthValues,
  "page_view": {
    /**
     * URL of the page, such as `https://example.com`.
     */
    page_location?: string;

    /**
     * Path of the page (example: `/about`).
     */
    page_path?: string;

    /**
     * The title of the page, like *About*.
     */
    page_title?: string;
  }
  "sign_up": AnalyticsAuthValues,
}

type EventName = keyof AnalyticsEvent;

/**
 * Report a Google Analytics event.
 *
 * @param {EventName} name The name of the event.
 * @param {any} value The value to be sent to Analytics.
 */
const reportEvent = <E extends EventName>(name: E, value: AnalyticsEvent[E]): void => {
  gtag("event", name, value);
};

export default reportEvent;
