import console from "node:console";
import { writeFileSync, appendFileSync } from "node:fs";
const LOG_LEVEL = {
    DEBUG: "DEBUG",
    INFO: "INFO",
    WARN: "WARN",
    ERROR: "ERROR",
} as const;

type LogLevel = keyof typeof LOG_LEVEL;

const LOG_LEVEL_PRIORITY = {
    DEBUG: 1,
    INFO: 2,
    WARN: 3,
    ERROR: 4,
} as const;

type LoggerOptions = {
    writeToFile: boolean;
    logFilePath: string;
    logLevelThreshold: LogLevel; // Minimum log level for logging
};
const LOG_LEVEL_Colors: Record<LogLevel, number> = {
    [LOG_LEVEL.DEBUG]: 36, // Cyan
    [LOG_LEVEL.INFO]: 32, // Green
    [LOG_LEVEL.WARN]: 33, // Yellow
    [LOG_LEVEL.ERROR]: 31, // Red
};

export class Logger {
    private name: string;
    // eslint-disable-next-line no-use-before-define
    private parent?: Logger;
    private performanceTests: Record<string, number> = {};
    private writeToFile: boolean;
    private logFilePath: string | undefined;
    private logLevelThreshold: LogLevel;
    constructor(
        name: string,
        parent?: Logger,
        options: LoggerOptions = {
            writeToFile: false,
            logFilePath: `logs/${name}.log`,
            logLevelThreshold: "DEBUG",
        }
    ) {
        this.name = name;
        this.parent = parent;
        if (options.writeToFile) {
            this.logFilePath = options.logFilePath;
        }

        this.writeToFile = options.writeToFile;
        this.logLevelThreshold = options.logLevelThreshold;
    }

    // Start a performance test with a given label
    startPerformanceBenchmark(label: string): void {
        this.performanceTests[label] = Date.now();
    }

    // End a performance test with a given label and log the elapsed time
    endPerformanceBenchmark(label: string, message: string): void {
        const startTime = this.performanceTests[label];
        if (startTime !== undefined) {
            const endTime = Date.now();
            const elapsedMilliseconds = endTime - startTime;
            this.debug(`${message} - Elapsed Time: ${elapsedMilliseconds}ms`);
            delete this.performanceTests[label];
        } else {
            this.warn(
                `No start time found for performance test with label "${label}"`
            );
        }
    }
    debug(message: string, ...args: unknown[]): void {
        this.log(LOG_LEVEL.DEBUG, message, args);
    }

    info(message: string, ...args: unknown[]): void {
        this.log(LOG_LEVEL.INFO, message, args);
    }

    warn(message: string, ...args: unknown[]): void {
        this.log(LOG_LEVEL.WARN, message, args);
    }

    error(message: string, ...args: unknown[]): void {
        const stackTrace = new Error().stack || "";
        this.log(LOG_LEVEL.ERROR, message, args, stackTrace);
    }
    // Assert function: checks condition and logs error if false
    assert(condition: boolean, message: string, ...args: unknown[]): void {
        if (!condition) {
            const stackTrace = new Error().stack || "";
            this.log(
                LOG_LEVEL.ERROR,
                `Assertion failed: ${message}`,
                args,
                stackTrace
            );
        }
    }

    // Method to create a child logger
    createChildLogger(name: string, otherLogger?: Logger): Logger {
        const mergedParent = otherLogger
            ? this.mergeLoggers(otherLogger)
            : this;
        return new Logger(name, mergedParent);
    }

    // Merges two loggers by nesting them
    private mergeLoggers(otherLogger: Logger): Logger {
        // Create a new logger that takes 'otherLogger' as the parent of 'this' logger
        return new Logger(this.name, otherLogger);
    }

    private colorize(text: string, colorCode: number): string {
        const resetCode = 0;
        return `\u001b[${colorCode}m${text}\u001b[${resetCode}m`;
    }

    private minimizeStackTrace(stackTrace: string): string {
        const lines = stackTrace.split("\n");
        if (lines.length <= 2) {
            return stackTrace;
        }
        const filteredLines = lines.filter(
            (line, index) => index === 0 || !line.includes("node_modules")
        );
        return filteredLines.join("\n");
    }

    private stringifyArgs(args: unknown[]): string[] {
        return args.map((arg) => {
            if (typeof arg === "object") {
                return JSON.stringify(arg, null, 2);
            }
            // @ts-ignore
            return arg.toString();
        });
    }

    private getFullLoggerName(level: LogLevel): string {
        const LOG_LEVEL_Colors: Record<LogLevel, number> = {
            [LOG_LEVEL.DEBUG]: 36, // Cyan
            [LOG_LEVEL.INFO]: 32, // Green
            [LOG_LEVEL.WARN]: 33, // Yellow
            [LOG_LEVEL.ERROR]: 31, // Red
        };

        const fullLoggerName = this.parent
            ? `${this.parent.getFullLoggerName(level)} -> ${this.name}`
            : this.name;
        return this.colorize(fullLoggerName, LOG_LEVEL_Colors[level]);
    }

    private log(
        level: LogLevel,
        message: string,
        args: unknown[] = [],
        stackTrace?: string
    ): void {
        if (!this.shouldLog(level)) {
            return; // Skip logging if the level is below the threshold
        }
        const fullLoggerName = this.getFullLoggerName(level);
        const LOG_LEVELText = this.colorize(
            `[${level}]`,
            LOG_LEVEL_Colors[level]
        );
        const timestamp = new Date().toISOString();
        const logMessage = `${this.colorize(
            timestamp,
            LOG_LEVEL_Colors[level]
        )} ${LOG_LEVELText} [${fullLoggerName}] - ${this.colorize(
            message,
            LOG_LEVEL_Colors[level]
        )}`;
        if (this.writeToFile) {
            this.writeLogToFile(logMessage);
        }
        const stringifiedArgs = this.stringifyArgs(args);
        console.log(logMessage, ...stringifiedArgs);

        if (stackTrace) {
            const minimizedStackTrace = this.minimizeStackTrace(stackTrace);
            if (this.writeToFile) {
                this.writeLogToFile(minimizedStackTrace);
            }
            console.error(
                this.colorize(minimizedStackTrace, LOG_LEVEL_Colors[level])
            );
        }
    }
    private shouldLog(level: LogLevel): boolean {
        return (
            LOG_LEVEL_PRIORITY[level] >=
            LOG_LEVEL_PRIORITY[this.logLevelThreshold]
        );
    }
    private writeLogToFile(logMessage: string) {
        if (this.writeToFile) {
            appendFileSync(this.logFilePath, logMessage + "\n", "utf-8");
        }
    }
}
