import "./polyfill.js";

import { expect } from "chai";
import { Kind } from "graphql";
import {
  GraphQLDuration,
  GraphQLInstant,
  GraphQLPlainDate,
  GraphQLPlainDateTime,
  GraphQLPlainTime,
  GraphQLZonedDateTime,
} from "./mod.js";

describe("GraphQLDuration", function () {
  it("should have the correct name", function () {
    expect(GraphQLDuration.name).equals("Duration");
  });

  it("should have the correct description", function () {
    expect(GraphQLDuration.description).contains("`Duration`")
  });

  describe(".serialize()", function () {
    it("should serialize Temporal.Duration values", function () {
      expect(GraphQLDuration.serialize(new Temporal.Duration(0, 2))).equals(
        "P2M"
      );
    });
    it("should not serialize non-Temporal.Duration values", function () {
      expect(() => GraphQLDuration.serialize(null)).throws();
      expect(() => GraphQLDuration.serialize(1)).throws();
      expect(() =>
        GraphQLDuration.serialize(new Date(2020, 1, 1, 0, 0, 0, 0))
      ).throws();
    });
  });

  describe(".parseLiteral()", function () {
    it("should parse string literals", function () {
      const parsed = GraphQLDuration.parseLiteral(
        { kind: Kind.STRING, value: "P2M" },
        null
      );
      expect(parsed).instanceOf(Temporal.Duration);
      expect(parsed.months).equals(2);
    });
    it("should not parse invalid string literals", function () {
      expect(() =>
        GraphQLDuration.parseLiteral({ kind: Kind.STRING, value: "2M" }, null)
      ).throws();
    });
    it("should not parse non-string literals", function () {
      expect(() =>
        GraphQLDuration.parseLiteral({ kind: Kind.NULL }, null)
      ).throws();
      expect(() =>
        GraphQLDuration.parseLiteral({ kind: Kind.INT, value: "1" }, null)
      ).throws();
    });
  });

  describe(".parseValue()", function () {
    it("should parse string values", function () {
      const parsed = GraphQLDuration.parseValue("P2M");
      expect(parsed).instanceOf(Temporal.Duration);
      expect(parsed.months).equals(2);
    });
    it("should not parse invalid string values", function () {
      expect(() => GraphQLDuration.parseValue("2M")).throws();
    });
    it("should not parse non-string values", function () {
      expect(() => GraphQLDuration.parseValue(null)).throws();
      expect(() => GraphQLDuration.parseValue(1)).throws();
      expect(() =>
        GraphQLDuration.parseValue(new Date(2020, 1, 1, 0, 0, 0, 0))
      ).throws();
    });
  });
});

describe("GraphQLInstant", function () {
  it("should have the correct name", function () {
    expect(GraphQLInstant.name).equals("Instant");
  });

  it("should have the correct description", function () {
    expect(GraphQLInstant.description).contains("`Instant`")
  });

  describe(".serialize()", function () {
    it("should serialize Temporal.Instant values", function () {
      expect(
        GraphQLInstant.serialize(Temporal.Instant.from("2020-01-01T00:00:00Z"))
      ).equals("2020-01-01T00:00:00Z");
    });
    it("should not serialize non-Temporal.Instant values", function () {
      expect(() => GraphQLInstant.serialize(null)).throws();
      expect(() => GraphQLInstant.serialize(1)).throws();
      expect(() =>
        GraphQLInstant.serialize(new Date(2020, 1, 1, 0, 0, 0, 0))
      ).throws();
    });
  });

  describe(".parseLiteral()", function () {
    it("should parse string literals", function () {
      expect(
        GraphQLInstant.parseLiteral(
          { kind: Kind.STRING, value: "2020-01-01T00:00:00Z" },
          null
        )
      ).instanceOf(Temporal.Instant);
    });
    it("should not parse invalid string literals", function () {
      expect(() =>
        GraphQLInstant.parseLiteral(
          { kind: Kind.STRING, value: "2020-01-01T00:00:00" },
          null
        )
      ).throws();
    });
    it("should not parse non-string literals", function () {
      expect(() =>
        GraphQLInstant.parseLiteral({ kind: Kind.NULL }, null)
      ).throws();
      expect(() =>
        GraphQLInstant.parseLiteral({ kind: Kind.INT, value: "1" }, null)
      ).throws();
    });
  });

  describe(".parseValue()", function () {
    it("should parse string values", function () {
      expect(GraphQLInstant.parseValue("2020-01-01T00:00:00Z")).instanceOf(
        Temporal.Instant
      );
    });
    it("should not parse invalid string values", function () {
      expect(() => GraphQLInstant.parseValue("2020-01-01")).throws();
    });
    it("should not parse non-string values", function () {
      expect(() => GraphQLInstant.parseValue(null)).throws();
      expect(() => GraphQLInstant.parseValue(1)).throws();
      expect(() =>
        GraphQLInstant.parseValue(new Date(2020, 1, 1, 0, 0, 0, 0))
      ).throws();
    });
  });
});

describe("GraphQLPlainDate", function () {
  it("should have the correct name", function () {
    expect(GraphQLPlainDate.name).equals("PlainDate");
  });

  it("should have the correct description", function () {
    expect(GraphQLPlainDate.description).contains("`PlainDate`")
  });

  describe(".serialize()", function () {
    it("should serialize Temporal.PlainDate values", function () {
      expect(
        GraphQLPlainDate.serialize(Temporal.PlainDate.from("2020-01-01"))
      ).equals("2020-01-01");
    });
    it("should not serialize non-Temporal.PlainDate values", function () {
      expect(() => GraphQLPlainDate.serialize(null)).throws();
      expect(() => GraphQLPlainDate.serialize(1)).throws();
      expect(() =>
        GraphQLPlainDate.serialize(new Date(2020, 1, 1, 0, 0, 0, 0))
      ).throws();
    });
  });

  describe(".parseLiteral()", function () {
    it("should parse string literals", function () {
      expect(
        GraphQLPlainDate.parseLiteral(
          { kind: Kind.STRING, value: "2020-01-01" },
          null
        )
      ).instanceOf(Temporal.PlainDate);
    });
    it("should not parse invalid string literals", function () {
      expect(() =>
        GraphQLPlainDate.parseLiteral(
          { kind: Kind.STRING, value: "2020-01" },
          null
        )
      ).throws();
    });
    it("should not parse non-string literals", function () {
      expect(() =>
        GraphQLPlainDate.parseLiteral({ kind: Kind.NULL }, null)
      ).throws();
      expect(() =>
        GraphQLPlainDate.parseLiteral({ kind: Kind.INT, value: "1" }, null)
      ).throws();
    });
  });

  describe(".parseValue()", function () {
    it("should parse string values", function () {
      expect(GraphQLPlainDate.parseValue("2020-01-01")).instanceOf(
        Temporal.PlainDate
      );
    });
    it("should not parse invalid string values", function () {
      expect(() => GraphQLPlainDate.parseValue("2020-01")).throws();
    });
    it("should not parse non-string values", function () {
      expect(() => GraphQLPlainDate.parseValue(null)).throws();
      expect(() => GraphQLPlainDate.parseValue(1)).throws();
      expect(() =>
        GraphQLPlainDate.parseValue(new Date(2020, 1, 1, 0, 0, 0, 0))
      ).throws();
    });
  });
});

describe("GraphQLPlainTime", function () {
  it("should have the correct name", function () {
    expect(GraphQLPlainTime.name).equals("PlainTime");
  });

  it("should have the correct description", function () {
    expect(GraphQLPlainTime.description).contains("`PlainTime`")
  });

  describe(".serialize()", function () {
    it("should serialize Temporal.PlainTime values", function () {
      expect(
        GraphQLPlainTime.serialize(Temporal.PlainTime.from("01:02:03"))
      ).equals("01:02:03");
    });
    it("should not serialize non-Temporal.PlainTime values", function () {
      expect(() => GraphQLPlainTime.serialize(null)).throws();
      expect(() => GraphQLPlainTime.serialize(1)).throws();
      expect(() =>
        GraphQLPlainTime.serialize(new Date(2020, 1, 1, 0, 0, 0, 0))
      ).throws();
    });
  });

  describe(".parseLiteral()", function () {
    it("should parse string literals", function () {
      expect(
        GraphQLPlainTime.parseLiteral(
          { kind: Kind.STRING, value: "01:02:03" },
          null
        )
      ).instanceOf(Temporal.PlainTime);
    });
    it("should not parse invalid string literals", function () {
      expect(() =>
        GraphQLPlainTime.parseLiteral(
          { kind: Kind.STRING, value: "string" },
          null
        )
      ).throws();
    });
    it("should not parse non-string literals", function () {
      expect(() =>
        GraphQLPlainTime.parseLiteral({ kind: Kind.NULL }, null)
      ).throws();
      expect(() =>
        GraphQLPlainTime.parseLiteral({ kind: Kind.INT, value: "1" }, null)
      ).throws();
    });
  });

  describe(".parseValue()", function () {
    it("should parse string values", function () {
      expect(GraphQLPlainTime.parseValue("01:02:03")).instanceOf(
        Temporal.PlainTime
      );
    });
    it("should not parse invalid string values", function () {
      expect(() => GraphQLPlainTime.parseValue("string")).throws();
    });
    it("should not parse non-string values", function () {
      expect(() => GraphQLPlainTime.parseValue(null)).throws();
      expect(() => GraphQLPlainTime.parseValue(1)).throws();
      expect(() =>
        GraphQLPlainTime.parseValue(new Date(2020, 1, 1, 0, 0, 0, 0))
      ).throws();
    });
  });
});

describe("GraphQLPlainDateTime", function () {
  it("should have the correct name", function () {
    expect(GraphQLPlainDateTime.name).equals("PlainDateTime");
  });

  it("should have the correct description", function () {
    expect(GraphQLPlainDateTime.description).contains("`PlainDateTime`")
  });

  describe(".serialize()", function () {
    it("should serialize Temporal.PlainDateTime values", function () {
      expect(
        GraphQLPlainDateTime.serialize(
          new Temporal.PlainDateTime(2020, 1, 1, 12, 30, 0)
        )
      ).equals("2020-01-01T12:30:00");
    });
    it("should not serialize non-Temporal.PlainDateTime values", function () {
      expect(() => GraphQLPlainDateTime.serialize(null)).throws();
      expect(() => GraphQLPlainDateTime.serialize(1)).throws();
      expect(() =>
        GraphQLPlainDateTime.serialize(new Date(2020, 1, 1, 12, 30, 0))
      ).throws();
    });
  });

  describe(".parseLiteral()", function () {
    it("should parse string literals", function () {
      const parsed = GraphQLPlainDateTime.parseLiteral(
        { kind: Kind.STRING, value: "2020-01-02T12:30:00" },
        null
      );
      expect(parsed).instanceOf(Temporal.PlainDateTime);
      expect(parsed.year).equals(2020);
      expect(parsed.month).equals(1);
      expect(parsed.day).equals(2);
      expect(parsed.hour).equals(12);
      expect(parsed.minute).equals(30);
      expect(parsed.second).equals(0);
    });
    it("should not parse invalid string literals", function () {
      expect(() =>
        GraphQLPlainDateTime.parseLiteral(
          { kind: Kind.STRING, value: "string" },
          null
        )
      ).throws();
    });
    it("should not parse non-string literals", function () {
      expect(() =>
        GraphQLPlainDateTime.parseLiteral({ kind: Kind.NULL }, null)
      ).throws();
      expect(() =>
        GraphQLPlainDateTime.parseLiteral({ kind: Kind.INT, value: "1" }, null)
      ).throws();
    });
  });

  describe(".parseValue()", function () {
    it("should parse string values", function () {
      const parsed = GraphQLPlainDateTime.parseValue("2020-01-02T12:30:00");
      expect(parsed).instanceOf(Temporal.PlainDateTime);
      expect(parsed.year).equals(2020);
      expect(parsed.month).equals(1);
      expect(parsed.day).equals(2);
      expect(parsed.hour).equals(12);
      expect(parsed.minute).equals(30);
      expect(parsed.second).equals(0);
    });
    it("should not parse invalid string values", function () {
      expect(() => GraphQLPlainDateTime.parseValue("string")).throws();
    });
    it("should not parse non-string values", function () {
      expect(() => GraphQLPlainDateTime.parseValue(null)).throws();
      expect(() => GraphQLPlainDateTime.parseValue(1)).throws();
      expect(() =>
        GraphQLPlainDateTime.parseValue(new Date(2020, 1, 1, 0, 0, 0, 0))
      ).throws();
    });
  });
});

describe("GraphQLZonedDateTime", function () {
  it("should have the correct name", function () {
    expect(GraphQLZonedDateTime.name).equals("ZonedDateTime");
  });

  it("should have the correct description", function () {
    expect(GraphQLZonedDateTime.description).contains("`ZonedDateTime`")
  });

  describe(".serialize()", function () {
    it("should serialize Temporal.ZonedDateTime values", function () {
      expect(
        GraphQLZonedDateTime.serialize(
          Temporal.ZonedDateTime.from(
            "2020-01-01T00:00:00+10:00[Australia/Brisbane]"
          )
        )
      ).equals("2020-01-01T00:00:00+10:00[Australia/Brisbane]");
    });
    it("should not serialize non-Temporal.ZonedDateTime values", function () {
      expect(() => GraphQLZonedDateTime.serialize(null)).throws();
      expect(() => GraphQLZonedDateTime.serialize(1)).throws();
      expect(() =>
        GraphQLZonedDateTime.serialize(new Date(2020, 1, 1, 0, 0, 0, 0))
      ).throws();
    });
  });

  describe(".parseLiteral()", function () {
    it("should parse string literals", function () {
      expect(
        GraphQLZonedDateTime.parseLiteral(
          {
            kind: Kind.STRING,
            value: "2020-01-01T00:00:00+10:00[Australia/Brisbane]",
          },
          null
        )
      ).instanceOf(Temporal.ZonedDateTime);
    });
    it("should not parse invalid string literals", function () {
      expect(() =>
        GraphQLZonedDateTime.parseLiteral(
          { kind: Kind.STRING, value: "2020-01-01T00:00:00+10:00" },
          null
        )
      ).throws();
    });
    it("should not parse non-string literals", function () {
      expect(() =>
        GraphQLZonedDateTime.parseLiteral({ kind: Kind.NULL }, null)
      ).throws();
      expect(() =>
        GraphQLZonedDateTime.parseLiteral({ kind: Kind.INT, value: "1" }, null)
      ).throws();
    });
  });

  describe(".parseValue()", function () {
    it("should parse string values", function () {
      expect(
        GraphQLZonedDateTime.parseValue(
          "2020-01-01T00:00:00+10:00[Australia/Brisbane]"
        )
      ).instanceOf(Temporal.ZonedDateTime);
    });
    it("should not parse invalid string values", function () {
      expect(() =>
        GraphQLZonedDateTime.parseValue("2020-01-01T00:00:00+10:00")
      ).throws();
    });
    it("should not parse non-string values", function () {
      expect(() => GraphQLZonedDateTime.parseValue(null)).throws();
      expect(() => GraphQLZonedDateTime.parseValue(1)).throws();
      expect(() =>
        GraphQLZonedDateTime.parseValue(new Date(2020, 1, 1, 0, 0, 0, 0))
      ).throws();
    });
  });
});
