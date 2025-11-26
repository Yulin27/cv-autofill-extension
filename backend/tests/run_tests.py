#!/usr/bin/env python3
"""
Test Runner Script with Enhanced Logging and Report Generation
Runs all tests and generates both console output and HTML reports
"""
import sys
import os
import subprocess
import json
import time
from datetime import datetime
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))


def setup_logging():
    """Configure logging for test execution"""
    import logging

    # Create logs directory
    log_dir = Path(__file__).parent / "logs"
    log_dir.mkdir(exist_ok=True)

    # Configure logging
    log_file = log_dir / f"test_run_{datetime.now().strftime('%Y%m%d_%H%M%S')}.log"

    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s | %(levelname)8s | %(message)s',
        handlers=[
            logging.FileHandler(log_file),
            logging.StreamHandler(sys.stdout)
        ]
    )

    return logging.getLogger(__name__), log_file


def print_banner(text, char="="):
    """Print a formatted banner"""
    width = 80
    print("\n" + char * width)
    print(f" {text}".ljust(width - 1))
    print(char * width + "\n")


def check_dependencies():
    """Check if required dependencies are installed"""
    logger.info("Checking dependencies...")

    required_packages = [
        ("pytest", "pytest"),
        ("pytest-asyncio", "pytest_asyncio"),
        ("pytest-html", "pytest_html"),
        ("pytest-json-report", "pytest_jsonreport"),
        ("httpx", "httpx")
    ]

    missing_packages = []

    for package_name, import_name in required_packages:
        try:
            __import__(import_name)
            logger.info(f"  ✓ {package_name}")
        except ImportError:
            logger.warning(f"  ✗ {package_name} - MISSING")
            missing_packages.append(package_name)

    if missing_packages:
        logger.error("\nMissing required packages. Install them with:")
        logger.error(f"  pip install {' '.join(missing_packages)}")
        return False

    logger.info("All dependencies installed!\n")
    return True


def run_tests(verbose=True, coverage=False):
    """Run pytest with appropriate flags"""
    logger.info("Running test suite...")

    # Prepare pytest arguments
    pytest_args = [
        "pytest",
        str(Path(__file__).parent),
        "-v" if verbose else "",
        "--asyncio-mode=auto",
        "--tb=short",
        "--color=yes",
        f"--html={Path(__file__).parent}/reports/test_report.html",
        "--self-contained-html",
        f"--json-report",
        f"--json-report-file={Path(__file__).parent}/reports/test_report.json",
        "-W", "ignore::DeprecationWarning"
    ]

    # Add coverage if requested
    if coverage:
        pytest_args.extend([
            "--cov=app",
            "--cov-report=html",
            f"--cov-report=term"
        ])

    # Filter empty strings
    pytest_args = [arg for arg in pytest_args if arg]

    # Create reports directory
    reports_dir = Path(__file__).parent / "reports"
    reports_dir.mkdir(exist_ok=True)

    # Run tests
    start_time = time.time()
    result = subprocess.run(pytest_args, capture_output=False)
    duration = time.time() - start_time

    logger.info(f"\nTest execution completed in {duration:.2f} seconds")

    return result.returncode == 0, duration


def generate_summary_report():
    """Generate a summary report from test results"""
    report_file = Path(__file__).parent / "reports" / "test_report.json"

    if not report_file.exists():
        logger.warning("No test report found")
        return

    with open(report_file, 'r') as f:
        report_data = json.load(f)

    print_banner("TEST SUMMARY", "=")

    summary = report_data.get("summary", {})

    print(f"Total Tests:  {summary.get('total', 0)}")
    print(f"✓ Passed:     {summary.get('passed', 0)}")
    print(f"✗ Failed:     {summary.get('failed', 0)}")
    print(f"⊘ Skipped:    {summary.get('skipped', 0)}")
    print(f"Duration:     {summary.get('duration', 0):.2f}s")

    # Print failed tests if any
    if summary.get('failed', 0) > 0:
        print("\n" + "=" * 80)
        print(" FAILED TESTS")
        print("=" * 80 + "\n")

        for test in report_data.get("tests", []):
            if test.get("outcome") == "failed":
                print(f"  ✗ {test['nodeid']}")
                if "call" in test and "longrepr" in test["call"]:
                    print(f"    Error: {test['call']['longrepr'][:200]}...")

    print("\n" + "=" * 80)
    print(f" Reports generated in: {Path(__file__).parent / 'reports'}")
    print("=" * 80 + "\n")


def main():
    """Main test runner function"""
    global logger

    # Setup
    print_banner("CV AUTO-FILL API TEST SUITE", "=")
    logger, log_file = setup_logging()

    logger.info(f"Test run started at {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    logger.info(f"Log file: {log_file}\n")

    # Check dependencies
    if not check_dependencies():
        sys.exit(1)

    # Parse arguments
    verbose = "--verbose" in sys.argv or "-v" in sys.argv
    coverage = "--coverage" in sys.argv or "-c" in sys.argv

    # Run tests
    success, duration = run_tests(verbose=verbose, coverage=coverage)

    # Generate summary
    generate_summary_report()

    # Print final status
    if success:
        print_banner("✓ ALL TESTS PASSED", "=")
        logger.info("Test suite completed successfully!")
    else:
        print_banner("✗ SOME TESTS FAILED", "=")
        logger.error("Test suite completed with failures")

    # Print log location
    print(f"\nDetailed logs saved to: {log_file}")
    print(f"HTML report: {Path(__file__).parent}/reports/test_report.html")
    print(f"Visualization: {Path(__file__).parent}/reports/test_visualization.html\n")

    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
