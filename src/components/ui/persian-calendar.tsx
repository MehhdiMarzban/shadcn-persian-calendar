"use client";
import { DayPicker, getDateLib } from "react-day-picker/persian";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { differenceInCalendarDays } from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { labelNext, labelPrevious, useDayPicker } from "react-day-picker";

function PersianCalendar({
    className = "",
    showOutsideDays = true,
    showYearSwitcher = true,
    // mode = "single",
    yearRange = 12,
    numberOfMonths = 1,
    ...props
}) {
    const [navView, setNavView] = useState("days");
    const [displayYears, setDisplayYears] = useState(
        useMemo(() => {
            const currentYear = new Date().getFullYear();
            return {
                from: currentYear - Math.floor(yearRange / 2 - 1),
                to: currentYear + Math.ceil(yearRange / 2),
            };
        }, [yearRange])
    );

    const { onNextClick, onPrevClick, startMonth, endMonth } = props;

    const columnsDisplayed = navView === "years" ? 1 : numberOfMonths;

    const _monthsClassName = cn("relative flex", props.monthsClassName);
    const _monthCaptionClassName = cn(
        "relative mx-10 flex h-7 items-center justify-center",
        props.monthCaptionClassName
    );
    const _weekdaysClassName = cn("flex flex-row", props.weekdaysClassName);
    const _weekdayClassName = cn(
        "w-8 text-sm font-normal text-muted-foreground",
        props.weekdayClassName
    );
    const _monthClassName = cn("w-full", props.monthClassName);
    const _captionClassName = cn(
        "relative flex items-center justify-center pt-1",
        props.captionClassName
    );
    const _captionLabelClassName = cn("truncate text-sm font-medium", props.captionLabelClassName);
    const buttonNavClassName = buttonVariants({
        variant: "outline",
        className: "absolute h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
    });
    const _buttonNextClassName = cn(buttonNavClassName, "right-0", props.buttonNextClassName);
    const _buttonPreviousClassName = cn(
        buttonNavClassName,
        "left-0",
        props.buttonPreviousClassName
    );
    const _navClassName = cn("flex items-start", props.navClassName);
    const _monthGridClassName = cn("mx-auto mt-4", props.monthGridClassName);
    const _weekClassName = cn("mt-2 flex w-max items-start", props.weekClassName);
    const _dayClassName = cn(
        "flex size-8 flex-1 items-center justify-center p-0 text-sm",
        props.dayClassName
    );
    const _dayButtonClassName = cn(
        buttonVariants({ variant: "ghost" }),
        "size-8 rounded-md p-0 font-normal transition-none aria-selected:opacity-100",
        props.dayButtonClassName
    );
    const buttonRangeClassName =
        "bg-accent [&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary [&>button]:hover:text-primary-foreground";
    const _rangeStartClassName = cn(
        buttonRangeClassName,
        "day-range-start rounded-s-md",
        props.rangeStartClassName
    );
    const _rangeEndClassName = cn(
        buttonRangeClassName,
        "day-range-end rounded-e-md",
        props.rangeEndClassName
    );
    const _rangeMiddleClassName = cn(
        "bg-accent !text-foreground [&>button]:bg-transparent [&>button]:!text-foreground [&>button]:hover:bg-transparent [&>button]:hover:!text-foreground",
        props.rangeMiddleClassName
    );
    const _selectedClassName = cn(
        "[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary [&>button]:hover:text-primary-foreground",
        props.selectedClassName
    );
    const _todayClassName = cn(
        "[&>button]:bg-accent [&>button]:text-accent-foreground",
        props.todayClassName
    );
    const _outsideClassName = cn(
        "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        props.outsideClassName
    );
    const _disabledClassName = cn("text-muted-foreground opacity-50", props.disabledClassName);
    const _hiddenClassName = cn("invisible flex-1", props.hiddenClassName);

    // Initialize the Persian date library
    const dateLib = getDateLib();

    return (
        <DayPicker
            broadcastCalendar
            firstWeekContainsDate={1}
            mode={"single"}
            numerals="arabext"
            timeZone="Asia/Tehran"
            weekStartsOn={6}
            showOutsideDays={showOutsideDays}
            className={cn("p-3", className)}
            style={{
                width: 248.8 * (columnsDisplayed ?? 1) + "px",
            }}
            classNames={{
                months: _monthsClassName,
                month_caption: _monthCaptionClassName,
                weekdays: _weekdaysClassName,
                weekday: _weekdayClassName,
                month: _monthClassName,
                caption: _captionClassName,
                caption_label: _captionLabelClassName,
                button_next: _buttonNextClassName,
                button_previous: _buttonPreviousClassName,
                nav: _navClassName,
                month_grid: _monthGridClassName,
                week: _weekClassName,
                day: _dayClassName,
                day_button: _dayButtonClassName,
                range_start: _rangeStartClassName,
                range_middle: _rangeMiddleClassName,
                range_end: _rangeEndClassName,
                selected: _selectedClassName,
                today: _todayClassName,
                outside: _outsideClassName,
                disabled: _disabledClassName,
                hidden: _hiddenClassName,
            }}
            components={{
                Chevron: ({ orientation }) => {
                    const Icon = orientation === "left" ? ChevronLeftIcon : ChevronRightIcon;
                    return <Icon className="h-4 w-4" />;
                },
                Nav: ({ className }) => {
                    const { nextMonth, previousMonth, goToMonth } = useDayPicker();

                    const isPreviousDisabled = (() => {
                        if (navView === "years") {
                            return (
                                (startMonth &&
                                    differenceInCalendarDays(
                                        new Date(displayYears.from - 1, 0, 1),
                                        startMonth
                                    ) < 0) ||
                                (endMonth &&
                                    differenceInCalendarDays(
                                        new Date(displayYears.from - 1, 0, 1),
                                        endMonth
                                    ) > 0)
                            );
                        }
                        return !previousMonth;
                    })();

                    const isNextDisabled = (() => {
                        if (navView === "years") {
                            return (
                                (startMonth &&
                                    differenceInCalendarDays(
                                        new Date(displayYears.to + 1, 0, 1),
                                        startMonth
                                    ) < 0) ||
                                (endMonth &&
                                    differenceInCalendarDays(
                                        new Date(displayYears.to + 1, 0, 1),
                                        endMonth
                                    ) > 0)
                            );
                        }
                        return !nextMonth;
                    })();

                    const handleNextClick = useCallback(() => {
                        if (!previousMonth) return;
                        if (navView === "years") {
                            setDisplayYears((prev) => ({
                                from: prev.from - (prev.to - prev.from + 1),
                                to: prev.to - (prev.to - prev.from + 1),
                            }));
                            onPrevClick?.(
                                new Date(
                                    displayYears.from - (displayYears.to - displayYears.from),
                                    0,
                                    1
                                )
                            );
                            return;
                        }
                        goToMonth(previousMonth);
                        onPrevClick?.(previousMonth);
                    }, [previousMonth, goToMonth]);
                    // handleNextClick
                    const handlePreviousClick = useCallback(() => {
                        if (!nextMonth) return;
                        if (navView === "years") {
                            setDisplayYears((prev) => ({
                                from: prev.from + (prev.to - prev.from + 1),
                                to: prev.to + (prev.to - prev.from + 1),
                            }));
                            onNextClick?.(
                                new Date(
                                    displayYears.from + (displayYears.to - displayYears.from),
                                    0,
                                    1
                                )
                            );
                            return;
                        }
                        goToMonth(nextMonth);
                        onNextClick?.(nextMonth);
                    }, [goToMonth, nextMonth]);
                    return (
                        <nav className={cn("flex items-center", className)}>
                            <Button
                                variant="outline"
                                className="absolute left-0 h-7 w-7 bg-transparent p-0 opacity-80 hover:opacity-100"
                                type="button"
                                tabIndex={isPreviousDisabled ? undefined : -1}
                                disabled={isPreviousDisabled}
                                aria-label={
                                    navView === "years"
                                        ? `Go to the previous ${
                                              displayYears.to - displayYears.from + 1
                                          } years`
                                        : labelPrevious(previousMonth)
                                }
                                onClick={handlePreviousClick}>
                                <ChevronLeftIcon className="h-4 w-4" />
                            </Button>

                            <Button
                                variant="outline"
                                className="absolute right-0 h-7 w-7 bg-transparent p-0 opacity-80 hover:opacity-100"
                                type="button"
                                tabIndex={isNextDisabled ? undefined : -1}
                                disabled={isNextDisabled}
                                aria-label={
                                    navView === "years"
                                        ? `Go to the next ${
                                              displayYears.to - displayYears.from + 1
                                          } years`
                                        : labelNext(nextMonth)
                                }
                                onClick={handleNextClick}>
                                <ChevronRightIcon className="h-4 w-4" />
                            </Button>
                        </nav>
                    );
                },
                CaptionLabel: ({ children, ...props }) => {
                    if (!showYearSwitcher) return <span {...props}>{children}</span>;

                    const persianFromYear = dateLib.getYear(new Date(displayYears.from, 0, 1)); // Convert 'from' year
                    const persianToYear = dateLib.getYear(new Date(displayYears.to, 0, 1));
                    return (
                        <Button
                            className="h-7 w-full truncate text-sm font-medium"
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                                setNavView((prev) => (prev === "days" ? "years" : "days"))
                            }>
                            {navView === "days"
                                ? children
                                : `${persianFromYear} - ${persianToYear}`}
                        </Button>
                    );
                },
                MonthGrid: ({ className, children, ...props }) => {
                    const { goToMonth, selected } = useDayPicker();
                    if (navView === "years") {
                        return (
                            <div className={cn("grid grid-cols-4 gap-y-2", className)} {...props}>
                                {Array.from(
                                    { length: displayYears.to - displayYears.from + 1 },
                                    (_, i) => {
                                        // Create a full Date object for conversion
                                        const fullDate = new Date(displayYears.from + i, 0, 1); // January 1st of each year

                                        // Convert the full date to Persian
                                        const persianYear = dateLib.getYear(fullDate);

                                        const isBefore =
                                            differenceInCalendarDays(
                                                new Date(displayYears.from + i, 11, 31),
                                                startMonth
                                            ) < 0;

                                        const isAfter =
                                            differenceInCalendarDays(
                                                new Date(displayYears.from + i, 0, 0),
                                                endMonth
                                            ) > 0;

                                        const isDisabled = isBefore || isAfter;

                                        return (
                                            <Button
                                                key={i}
                                                className={cn(
                                                    "h-7 w-full text-sm font-normal text-foreground",
                                                    persianYear === dateLib.getYear(new Date()) &&
                                                        "bg-accent font-medium text-accent-foreground"
                                                )}
                                                variant="ghost"
                                                onClick={() => {
                                                    setNavView("days");
                                                    goToMonth(
                                                        new Date(
                                                            displayYears.from + i,
                                                            //@ts-expect-error fix
                                                            selected?.getMonth?.() ?? 0
                                                        )
                                                    );
                                                }}
                                                disabled={
                                                    navView === "years" ? isDisabled : undefined
                                                }>
                                                {persianYear}
                                            </Button>
                                        );
                                    }
                                )}
                            </div>
                        );
                    }
                    return (
                        <table className={className} {...props}>
                            {children}
                        </table>
                    );
                },
            }}
            numberOfMonths={columnsDisplayed}
            {...props}
        />
    );
}

PersianCalendar.displayName = "PersianCalendar";

export { PersianCalendar as Calendar };
