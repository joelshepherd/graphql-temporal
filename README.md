# graphql-temporal

Provides GraphQL scalars for JavaScript's new Temporal specification.

## Install

You will need a Temporal-compatible JavaScript environment (none of which exist yet) or a polyfill to use this package.

The Temporal proposal's [experimental polyfill](https://www.npmjs.com/package/proposal-temporal) is currently the most complete implementation. See the [test's polyfill](src/polyfill.ts) for an installation example.

```sh
$ npm install graphql-temporal
```

## Usage

Using `graphql` package:

```ts
import { GraphQLZonedDateTime } from "graphql-temporal";

const schema = new GraphQLSchema({
  ZonedDateTime: GraphQLZonedDateTime,
});
```

Using Apollo server:

```ts
import { GraphQLZonedDateTime } from "graphql-temporal";

const server = new ApolloServer({
  typeDefs: ["scalar ZonedDateTime"],
  resolvers: {
    ZonedDateTime: GraphQLZonedDateTime,
  },
});
```

## Scalars

### Instant

An `Instant` represents a fixed point in time (called "exact time"), without regard to calendar or location.

Maps to a [`Temporal.Instant`](https://tc39.es/proposal-temporal/docs/instant.html) in your resolvers.

Example serialized string: `2020-01-01T12:30:00Z`

### ZonedDateTime

A `ZonedDateTime` is a timezone-aware, calendar-aware date/time object that represents a real event that has happened (or will happen) at a particular exact time from the perspective of a particular region on Earth.

Maps to a [`Temporal.ZonedDateTime`](https://tc39.es/proposal-temporal/docs/zoneddatetime.html) in your resolvers.

Example serialized string: `2020-01-01T12:30:00+10:00[Australia/Brisbane]`

### PlainDate

A `PlainDate` object represents a calendar date that is not associated with a particular time or time zone.

Maps to a [`Temporal.PlainDate`](https://tc39.es/proposal-temporal/docs/plaindate.html) in your resolvers.

Example serialized string: `2020-01-01`

### PlainTime

A `PlainTime` represents a wall-clock time, with a precision in nanoseconds, and without any time zone.

Maps to a [`Temporal.PlainTime`](https://tc39.es/proposal-temporal/docs/plaintime.html) in your resolvers.

Example serialized string: `12:30:00`

### PlainDateTime

A `PlainDateTime` represents a calendar date and wall-clock time that does not carry time zone information.

Maps to a [`Temporal.PlainDateTime`](https://tc39.es/proposal-temporal/docs/plaindatetime.html) in your resolvers.

Example serialized string: `2020-01-01T12:30:00`

### Duration

A `Duration` represents a duration of time which can be used in date/time arithmetic.

Maps to a [`Temporal.Duration`](https://tc39.es/proposal-temporal/docs/duration.html) in your resolvers.

Example serialized string: `P2M`
