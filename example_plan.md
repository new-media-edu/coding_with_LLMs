# Slippy Cop - Planning Document

## Project Overview

Slippy Cop is an open-source hardware and software project that automatically searches the internet for photos of cops falling and downloads them to a cloud drive. When a new image is downloaded, an Arduino rings a bell above my desk and a small printer prints out the image.

### Primary Objectives

- **Automated Curation**: Continuously scour the web for specific niche imagery without manual intervention.
- **Physical Notification**: Bridge the digital and physical worlds by creating immediate sensory feedback (sound and print) for digital events.
- **Reliable Pipeline**: Establish a robust chain from web scraping to cloud storage to hardware execution.
- **Entertainment**: Create a humorous and engaging desk toy.

### Design Philosophy

- **Whimsy over Function**: The primary goal is entertainment; efficiency is secondary to the "performance" of the device.
- **Tangible Output**: Digital images are ephemeral; printing them makes the internet "real" and permanent.
- **Set It and Forget It**: The system should run autonomously on a Raspberry Pi or server with minimal maintenance.
- **Modular Hardware**: Keep the bell ringer and printer loosely coupled to the software so components can be upgraded easily.

## Features & Roadmap

### Phase 1: The Scraper (Software)
- [ ] **Image Search Module**: Script to search Google Images/Reddit/Social Media for keywords.
- [ ] **Content Validation**: Basic computer vision (maybe YOLO or simple classifier) to ensure the image actually contains the target subject matter.
- [ ] **Cloud Integration**: Authenticate and upload valid images to a shared Google Drive folder.
- [ ] **Duplicate Detection**: Hashing images to verify they haven't been printed before.

### Phase 2: The Hardware Interface (Arduino)
- [ ] **Bell Mechanism**: Servo motor control to physically ring a desk bell.
- [ ] **Serial Communication**: Define protocol between Python server and Arduino (e.g., "RING", "PRINT_start").
- [ ] **Thermal Printer Integration**: Send image bitmaps to a mini thermal printer via serial/USB.

### Phase 3: Integration & orchestration
- [ ] **Event Loop**: Watcher service that polls for new images -> Downloads -> Triggers Bell -> Prints.
- [ ] **Dashboard**: Simple web view to see recent history and printer status.

## Tech Stack

- **Hardware**: Arduino Uno / ESP32, Servo Motor, Mini Thermal Printer (TTL Serial), Desk Bell.
- **Backend**: Python 3.11
- **Libraries**:
  - `selenium` / `praw` (Scraping)
  - `opencv-python` / `pytorch` (Image analysis)
  - `pyserial` (Hardware comms)
  - `google-api-python-client` (Drive API)

## Development Guidelines
- I prefer to use variable names with underscores, such as variable_name rather than variableName.
- Keep the code very well commented so that I can read it.

## Project Structure

```text
slippy-cop/
├── hardware/
│   ├── arduino/
│   │   └── bell_control.ino      # Controls the bell and receipt printer trigger
│   ├── 3d_models/
│   │   ├── bell_mount.stl        # Mount for the servo/bell mechanism
│   │   └── printer_case.stl      # Enclosure for the thermal printer
│   └── schematics/
│       └── wiring_diagram.pdf    # Circuit diagram for Arduino, servo, and printer
├── firmware/
│   └── main.cpp                  # Main logic for ESP32/Arduino
├── server/
│   ├── scraper/
│   │   ├── main.py               # Main scraping logic (Selenium/BeautifulSoup)
│   │   ├── filters.py            # Image processing to verify content (CV models)
│   │   └── sources.json          # List of target sites/subreddits
│   ├── cloud/
│   │   └── drive_sync.py         # Google Drive/Dropbox API integration
│   ├── printing/
│   │   └── printer_driver.py     # Thermal printer serial commands (ESC/POS)
│   ├── app.py                    # Flask server to orchestrate events
│   └── requirements.txt
├── docs/
│   ├── bill_of_materials.md
│   └── assembly_guide.md
├── .env.example
└── README.md
```