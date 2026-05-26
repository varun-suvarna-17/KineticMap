# Operating System - Exam Notes

I'll organize these topics in a logical sequence for better understanding. Here are comprehensive medium-length notes:

---

## 1. VIRTUAL MEMORY

**Concept** (Slide 2, virtual_memory.pdf):
Virtual memory is a memory management technique that allows execution of processes that are not completely in memory. It abstracts main memory into an extremely large, uniform array of storage.

**Benefits:**
- Programs are no longer constrained by physical memory size
- More programs can run simultaneously
- Less I/O needed for loading/swapping programs
- Enables process sharing through page sharing

**Key Feature** (Slide 3):
- Separates logical memory (as perceived by users) from physical memory
- Virtual address space shows the logical view of how a process is stored
- Includes sparse address space (hole between stack and heap)

**Diagram Reference:** Slide 3 - Shows stack, heap, data segments with address space from 0 to max

---

## 2. DEMAND PAGING

**Concept** (Slide 4):
Demand paging is a paging system where pages are only loaded when demanded during program execution.

**Why Demand Paging?**
- Loading entire programs wastes memory on unused code
- Uses a "lazy swapper" (pager) - never swaps a page unless needed

**Advantages:**
- Avoids reading unnecessary pages into memory
- Decreases swap time
- Reduces physical memory requirements

**Valid-Invalid Bit Scheme** (Slide 5):
- **Valid (V):** Page is both legal and currently in memory
- **Invalid (I):** Page either not valid OR valid but currently on disk

**Diagram Reference:** Slide 5 - Shows logical memory, page table with valid-invalid bits, physical memory, and disk

---

## 3. PAGE FAULT HANDLING

**Page Fault** (Slide 6):
Occurs when a process tries to access a page marked as invalid (not in memory).

**Page Fault Service Routine** (Steps):
1. Check internal table - determine if reference is valid or invalid
2. If invalid → terminate process
3. If valid → page it in:
   - Find a free frame
   - Read page from disk into the frame
   - Modify internal table (set valid bit)
   - Restart the instruction

**Diagram Reference:** Slide 9 - Shows complete page service routine with 6 steps including OS, trap, backing store, and page table

---

## 4. EFFECTIVE MEMORY ACCESS TIME (EMAT)

**Formula** (Slide 8):

**Without page fault:**
EMAT = memory access time

**With page fault:**
EMAT = (1 - p) × ma + p × page fault time

Where:
- p = Probability of page fault
- ma = memory access time
- page fault time = time to service a page fault

**Example Problem** (Slide 10-11):
- Memory access time = 1 μs
- Page fault service time = 20 ms = 20,000 μs
- 80% hits in associative memory
- 10% of remaining (2% total) cause page faults

**Solution:**
EMAT = (0.80 × 1) + (0.18 × 2) + (0.02 × 20,002)
     = 0.8 + 0.36 + 400.04
     = **401.2 μs**

---

## 5. PAGE REPLACEMENT

**Need for Page Replacement** (Slide 14):
When memory is over-allocated (to increase multiprogramming) and no free frames exist during page fault.

**Solutions:**
1. Process Termination
2. Swapping out a process
3. **Page Replacement** (preferred)

**Modify Bit (Dirty Bit)** (Slide 15):
- Set when page is modified after being read into memory
- If set during replacement → must write page to disk
- If not set → page unchanged, no disk write needed

**Diagram Reference:** Slide 16 - Shows page replacement process with victim page selection

---

## 6. PAGE REPLACEMENT ALGORITHMS

### A. FIFO (First-In-First-Out) (Slide 19)

**Principle:** Replace the oldest page (first brought into memory)

**Example:** Reference string: 7,0,1,2,0,3,0,4,2,3,0,3,2,1,2,0,1,7,0,1 with 3 frames
- **Total Page Faults = 15**

**Problem - Belady's Anomaly** (Slide 20):
- Increasing frames may **increase** page faults (unexpected behavior)
- **Diagram Reference:** Slide 20 - Graph showing page faults vs frames with anomaly

### B. Optimal Page Replacement (Slide 21)

**Principle:** Replace page that will NOT be used for longest period

**Characteristics:**
- Lowest page-fault rate
- Never suffers from Belady's anomaly
- Difficult to implement (requires future knowledge)

**Same Example:** 
- **Total Page Faults = 9** (best performance)

### C. LRU (Least Recently Used) (Slide 23)

**Principle:** Replace page not used for longest time (looks backward)

**Same Example:**
- **Total Page Faults = 12**

**Implementation Methods** (Slide 24):
1. **Counters:** Time-of-use field in page table with logical clock
2. **Stack:** Keep stack of page numbers; referenced page moved to top

**Property:** LRU doesn't suffer from Belady's anomaly (Stack algorithm - Slide 25)

---

## 7. FRAME ALLOCATION

**Concept** (Slide 33):
How to allocate fixed amount of free memory among various processes?

**Key Points:**
- Must allocate **minimum number of frames** per process
- Number of frames ↓ → Page fault rate ↑

**Allocation Algorithms:**

### A. Equal Allocation
Each process gets equal number of frames

### B. Proportional Allocation
Frames allocated based on process size:
- Total virtual memory size: S = ΣSᵢ
- Frames for process i: (Sᵢ / S) × m

Where m = total available frames

**Diagram Reference:** Slide 33 shows formula

---

## 8. GLOBAL vs LOCAL REPLACEMENT (Slide 34)

### Local Replacement:
- Process selects replacement frame from **only its own** allocated frames
- Number of frames per process remains constant
- May hinder process if it needs more memory

### Global Replacement:
- Process can select from **all frames** in system
- Number of allocated frames can increase
- Process cannot control its page-fault rate
- **Results in greater system throughput** (preferred)

---

## 9. THRASHING

### What is Thrashing? (Slide 35)

**Definition:** A process is thrashing if it spends **more time paging than executing**

### Why Does Thrashing Occur?

**Sequence of Events:**
1. OS increases degree of multiprogramming for better CPU utilization
2. Global page replacement used
3. Processes start faulting and need pages
4. Processes queue at paging device to swap pages
5. Ready queue empties
6. CPU utilization decreases
7. OS responds by increasing multiprogramming further
8. **Result:** Thrashing - page fault rate increases tremendously

**Diagram Reference:** Slide 36 - Graph showing CPU utilization vs degree of multiprogramming with thrashing region

### Effects of Thrashing:
- System throughput plunges
- Effective access time increases (even for non-thrashing processes)
- Severe performance degradation
- System becomes unresponsive

### Prevention Methods:

**1. Local Replacement Algorithm** (Slide 36):
- Cannot steal frames from other processes
- Limits effect but increases average page fault service time
- Not complete solution

**2. Working Set Strategy** (Slide 37-38):

**Working Set Model:**
- Δ = working set window
- Working Set (WS) = set of pages in most recent Δ page references
- Approximates program's locality

**Formula:**
Total demand for frames: D = Σ WSSᵢ

**Rule:**
- If D > m (total frames) → thrashing will occur
- **Solution:** OS suspends processes, writes them out (swapped)

**Diagram Reference:** Slide 37 - Shows reference string with working sets WS(t₁) and WS(t₂)

**3. Page Fault Frequency (PFF)** (Slide 40):

**Approach:**
- Establish acceptable page-fault frequency rate
- Monitor actual rate
- **If rate too high** → process gains frames
- **If rate too low** → process loses frames

**Diagram Reference:** Slide 40 - Graph showing page-fault rate vs number of frames with upper and lower bounds

---

## 10. SWAPPING

**Concept:**
Swapping is moving entire processes between **main memory and secondary memory (backing store)**.

**Purpose:**
- Free up memory when system is overloaded
- Part of memory management and multiprogramming

**When Used:**
- When thrashing detected
- When system needs to reduce degree of multiprogramming
- To bring in higher priority processes

**How it Works:**
1. Process selected for swapping out
2. All pages written to backing store (disk)
3. Frames freed for other processes
4. When needed, process swapped back in

---

## 11. CONTIGUOUS MEMORY ALLOCATION

### Challenges:

**1. Fragmentation Problems:**

**External Fragmentation:**
- Free memory scattered in small blocks
- Total free memory sufficient but not contiguous
- Cannot allocate to new process

**Internal Fragmentation:**
- Allocated memory slightly larger than requested
- Unused portion within allocated block wasted

**2. Memory Protection:**
- Need to protect one process from another
- Use base and limit registers

**3. Memory Compaction:**
- Required to solve external fragmentation
- Expensive operation (requires relocating all processes)

**4. Dynamic Memory Allocation:**
- First-fit, Best-fit, Worst-fit strategies
- Each has trade-offs between speed and efficiency

---

## 12. FILE SYSTEM CONCEPTS

### Directory Structures:

### A. Single-Level Directory (Slide 25, file_system.pdf)

**Structure:**
- One directory for all users
- All files in single location

**Problems:**
- **Naming problem:** No two files can have same name
- **No grouping capability**
- Inefficient for multi-user systems

**Diagram Reference:** Slide 25 - Shows single directory with all files

### B. Two-Level Directory (Slide 26)

**Structure:**
- Master File Directory (MFD)
- Separate User File Directory (UFD) for each user

**Advantages:**
- **Path names** enable file identification
- Different users can have same filename
- Efficient searching within user directory

**Disadvantages:**
- **No grouping capability** within user directory
- Cannot share files easily between users

**Diagram Reference:** Slide 26 - Shows master directory with multiple user directories

### File Allocation Methods:

*Note: This topic appears to be from your second PPT which you'll provide separately*

---

## 13. PROTECTION

### Goals (Slide 40, file_system.pdf):

**File owner/creator should control:**
1. **What can be done** (operations)
2. **By whom** (users/groups)

### Types of Access:
- Read
- Write  
- Execute
- Append
- Delete
- List

### Basic Principles - Access Control (Slide 41):

**Unix/Linux Protection Model:**

Three classes of users with 3-bit access rights (RWX):

**a) Owner access:** 7 → RWX (111) - Full control
**b) Group access:** 6 → RWX (110) - Read/Write only  
**c) Public access:** 1 → RWX (001) - Execute only

**Example:** `chmod 761 game`
- Owner: Read, Write, Execute (7)
- Group: Read, Write (6)
- Others: Execute only (1)

**Diagram Reference:** Slide 41 shows the chmod command structure with owner, group, public permissions

---

## SUMMARY OF KEY FORMULAS

1. **EMAT:** (1-p) × ma + p × page_fault_time
2. **Proportional Allocation:** (Sᵢ/S) × m
3. **Working Set Demand:** D = Σ WSSᵢ

---

## IMPORTANT DIAGRAMS TO REFER:

1. **Virtual Memory Structure** - Slide 3 (virtual_memory.pdf)
2. **Page Table with Valid-Invalid Bits** - Slide 5
3. **Page Fault Service Routine** - Slide 9
4. **Page Replacement Process** - Slide 16
5. **Belady's Anomaly Graph** - Slide 20
6. **CPU Utilization vs Multiprogramming** - Slide 36
7. **Working Set Example** - Slide 37
8. **PFF Graph** - Slide 40
9. **Single-Level Directory** - Slide 25 (file_system.pdf)
10. **Two-Level Directory** - Slide 26 (file_system.pdf)

---

These notes cover all topics in proper sequence. When you provide the second PPT, I'll add notes on file allocation and space management methods. Good luck with your exam!