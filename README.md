# simplelog

## Overview

[`simplelog`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fpaulbose%2Fdev_projects%2Fweb_dev%2Fredwardify%2Fpackages%2Fsimplelog%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A0%2C%22character%22%3A2%7D%7D%5D%2C%22f8598417-c6c5-4c39-8744-a43a2239d015%22%5D "Go to definition") is a lightweight and flexible logging library for TypeScript. It provides various logging levels, performance benchmarking, and the ability to log messages to the console or a file.

## Features

-   Multiple log levels: [`DEBUG`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fpaulbose%2Fdev_projects%2Fweb_dev%2Fredwardify%2Fpackages%2Fsimplelog%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A8%2C%22character%22%3A24%7D%7D%5D%2C%22f8598417-c6c5-4c39-8744-a43a2239d015%22%5D "Go to definition"), [`INFO`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fpaulbose%2Fdev_projects%2Fweb_dev%2Fredwardify%2Fpackages%2Fsimplelog%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A8%2C%22character%22%3A33%7D%7D%5D%2C%22f8598417-c6c5-4c39-8744-a43a2239d015%22%5D "Go to definition"), [`WARN`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fpaulbose%2Fdev_projects%2Fweb_dev%2Fredwardify%2Fpackages%2Fsimplelog%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A8%2C%22character%22%3A41%7D%7D%5D%2C%22f8598417-c6c5-4c39-8744-a43a2239d015%22%5D "Go to definition"), [`ERROR`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fpaulbose%2Fdev_projects%2Fweb_dev%2Fredwardify%2Fpackages%2Fsimplelog%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A8%2C%22character%22%3A49%7D%7D%5D%2C%22f8598417-c6c5-4c39-8744-a43a2239d015%22%5D "Go to definition")
-   Performance benchmarking
-   Hierarchical loggers with parent-child relationships
-   Optional file logging
-   Colorized console output
-   Stack trace minimization

## Installation

To install [`simplelog`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fpaulbose%2Fdev_projects%2Fweb_dev%2Fredwardify%2Fpackages%2Fsimplelog%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A0%2C%22character%22%3A2%7D%7D%5D%2C%22f8598417-c6c5-4c39-8744-a43a2239d015%22%5D "Go to definition"), use npm or yarn:

```sh
npm install simplelog
# or
yarn add simplelog
```

## Usage

### Creating a Logger

To create a logger, instantiate the [`Logger`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fpaulbose%2Fdev_projects%2Fweb_dev%2Fredwardify%2Fpackages%2Fsimplelog%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A26%2C%22character%22%3A11%7D%7D%5D%2C%22f8598417-c6c5-4c39-8744-a43a2239d015%22%5D "Go to definition") class with a name and optional options:

```typescript
import { Logger } from "simplelog";

const logger = new Logger("myLogger", undefined, {
    writeToFile: true,
    logFilePath: "logs/myLogger.log",
    logLevelThreshold: "DEBUG",
});
```

### Logging Messages

You can log messages at different levels using the `debug`, `info`, `warn`, and `error` methods:

```typescript
logger.debug("This is a debug message");
logger.info("This is an info message");
logger.warn("This is a warning message");
logger.error("This is an error message");
```

### Performance Benchmarking

You can start and end performance benchmarks to measure the time taken by a block of code:

```typescript
logger.startPerformanceBenchmark("myBenchmark");
// ... code to benchmark ...
logger.endPerformanceBenchmark("myBenchmark", "Benchmark completed");
```

### Assertions

You can use the `assert` method to log an error if a condition is false:

```typescript
logger.assert(someCondition, "This condition should be true");
```

### Creating Child Loggers

You can create child loggers that inherit properties from their parent logger:

```typescript
const childLogger = logger.createChildLogger("childLogger");
childLogger.info("This is a message from the child logger");
```

## API

### Logger

#### Constructor

```typescript
constructor(
    name: string,
    parent?: Logger,
    options?: LoggerOptions
)
```

-   [`name`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fpaulbose%2Fdev_projects%2Fweb_dev%2Fredwardify%2Fpackages%2Fsimplelog%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A27%2C%22character%22%3A56%7D%7D%5D%2C%22f8598417-c6c5-4c39-8744-a43a2239d015%22%5D "Go to definition"): The name of the logger.
-   [`parent`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fpaulbose%2Fdev_projects%2Fweb_dev%2Fredwardify%2Fpackages%2Fsimplelog%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A10%2C%22character%22%3A28%7D%7D%5D%2C%22f8598417-c6c5-4c39-8744-a43a2239d015%22%5D "Go to definition"): The parent logger (optional).
-   [`options`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fpaulbose%2Fdev_projects%2Fweb_dev%2Fredwardify%2Fpackages%2Fsimplelog%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A27%2C%22character%22%3A74%7D%7D%5D%2C%22f8598417-c6c5-4c39-8744-a43a2239d015%22%5D "Go to definition"): Logger options (optional).

#### Methods

-   `debug(message: string, ...args:[]): void`
-   `info(message: string, ...args: unknown[]): void`
-   `warn(message: string, ...args: unknown[]): void`
-   `error(message: string, ...args: unknown[]): void`
-   `startPerformanceBenchmark(label: string): void`
-   `endPerformanceBenchmark(label: string, message: string): void`
-   `assert(condition: boolean, message: string, ...args: unknown[]): void`
-   `createChildLogger(name: string, otherLogger?: Logger): Logger`

## License

This project is licensed under the MIT License.
