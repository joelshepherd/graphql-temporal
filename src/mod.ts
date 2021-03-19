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

function createScalar(Class: TemporalClass): GraphQLScalarType {
  const name = Class.name;
  return new GraphQLScalarType({
    name,
    // TODO: description property
    serialize(value: unknown) {
      if (value instanceof Class) {
        return value.toString();
      }
      throw new TypeError(
        `${name} must be serialized from a Temporal.${name}.`
      );
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return Class.from(ast.value);
      }
      throw new TypeError(`${name} must be represented as a string.`);
    },
    parseValue(value: unknown) {
      if (value instanceof Class) {
        return value;
      }
      if (typeof value === "string") {
        return Class.from(value);
      }
      throw new TypeError(
        `${name} must be represented as a Temporal.${name} or string.`
      );
    },
  });
}

export const GraphQLDuration = createScalar(Temporal.Duration);
export const GraphQLInstant = createScalar(Temporal.Instant);
export const GraphQLPlainDate = createScalar(Temporal.PlainDate);
export const GraphQLPlainTime = createScalar(Temporal.PlainTime);
export const GraphQLPlainDateTime = createScalar(Temporal.PlainDateTime);
export const GraphQLZonedDateTime = createScalar(Temporal.ZonedDateTime);
