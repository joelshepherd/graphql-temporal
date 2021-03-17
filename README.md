# graphql-temporal

Provides GraphQL scalars for JavaScript's new Temporal specification.

## Install

You will need a Temporal-compatible JavaScript environment (none of which exist yet), or a polyfill.

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

Example serialized string: `2020-01-01T00:00:00Z`

### ZonedDateTime

A `ZonedDateTime` is a timezone-aware, calendar-aware date/time object that represents a real event that has happened (or will happen) at a particular exact time from the perspective of a particular region on Earth.

Maps to a [`Temporal.ZonedDateTime`](https://tc39.es/proposal-temporal/docs/zoneddatetime.html) in your resolvers.

Example serialized string: `2020-01-01T00:00:00+10:00[Australia/Brisbane]`

### PlainDate

A `PlainDate` object represents a calendar date that is not associated with a particular time or time zone.

Maps to a [`Temporal.PlainDate`](https://tc39.es/proposal-temporal/docs/plaindate.html) in your resolvers.

Example serialized string: `2020-01-01`

### PlainTime

A `PlainTime` represents a wall-clock time, with a precision in nanoseconds, and without any time zone.

Maps to a [`Temporal.PlainTime`](https://tc39.es/proposal-temporal/docs/plaintime.html) in your resolvers.

Example serialized string: `12:30:00`
