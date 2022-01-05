import { GraphQLScalarType, Kind } from "graphql";

// Check the environment for Temporal support.
if (!Temporal) {
  throw new ReferenceError(
    "Temporal is not defined. Include a polyfill for this environment."
  );
}

type TemporalClass =
  | typeof Temporal.Duration
  | typeof Temporal.Instant
  | typeof Temporal.PlainDate
  | typeof Temporal.PlainTime
  | typeof Temporal.PlainDateTime
  | typeof Temporal.ZonedDateTime;

function createScalar<T extends TemporalClass>(
  Class: T,
  description: string
): GraphQLScalarType<InstanceType<T>, string> {
  const name = Class.name;
  return new GraphQLScalarType({
    name,
    description,
    serialize(value) {
      if (value instanceof Class) {
        return value.toString();
      }
      throw new TypeError(
        `${name} must be serialized from a Temporal.${name}.`
      );
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return Class.from(ast.value) as InstanceType<T>;
      }
      throw new TypeError(`${name} must be represented as a string.`);
    },
    parseValue(value) {
      if (value instanceof Class) {
        return value as InstanceType<T>;
      }
      if (typeof value === "string") {
        return Class.from(value) as InstanceType<T>;
      }
      throw new TypeError(
        `${name} must be represented as a Temporal.${name} or string.`
      );
    },
  });
}

/** A `Duration` represents a duration of time which can be used in date/time arithmetic. */
export const GraphQLDuration = createScalar(
  Temporal.Duration,
  "A `Duration` represents a duration of time which can be used in date/time arithmetic."
);

/** An `Instant` represents a fixed point in time (called "exact time"), without regard to calendar or location. */
export const GraphQLInstant = createScalar(
  Temporal.Instant,
  'An `Instant` represents a fixed point in time (called "exact time"), without regard to calendar or location.'
);

/** A `PlainDate` object represents a calendar date that is not associated with a particular time or time zone. */
export const GraphQLPlainDate = createScalar(
  Temporal.PlainDate,
  "A `PlainDate` object represents a calendar date that is not associated with a particular time or time zone."
);

/** A `PlainTime` represents a wall-clock time, with a precision in nanoseconds, and without any time zone. */
export const GraphQLPlainTime = createScalar(
  Temporal.PlainTime,
  "A `PlainTime` represents a wall-clock time, with a precision in nanoseconds, and without any time zone."
);

/** A `PlainDateTime` represents a calendar date and wall-clock time that does not carry time zone information. */
export const GraphQLPlainDateTime = createScalar(
  Temporal.PlainDateTime,
  "A `PlainDateTime` represents a calendar date and wall-clock time that does not carry time zone information."
);

/** A `ZonedDateTime` is a timezone-aware, calendar-aware date/time object that represents a real event that has happened (or will happen) at a particular exact time from the perspective of a particular region on Earth. */
export const GraphQLZonedDateTime = createScalar(
  Temporal.ZonedDateTime,
  "A `ZonedDateTime` is a timezone-aware, calendar-aware date/time object that represents a real event that has happened (or will happen) at a particular exact time from the perspective of a particular region on Earth."
);
