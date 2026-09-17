"""TrustTrack AI demo exception detector.

This deterministic baseline is intentionally explainable for the hackathon demo.
It can later be replaced by a trained computer-vision/time-series model.
"""
import re


def detect(reported_progress: int, evidence_days_old: int, observation: str = "") -> dict:
    score = 0
    reasons = []
    if evidence_days_old >= 14:
        score += 55
        reasons.append(f"Evidence is {evidence_days_old} days old")
    elif evidence_days_old >= 7:
        score += 25
        reasons.append(f"Evidence gap is {evidence_days_old} days")
    if reported_progress >= 70 and evidence_days_old >= 7:
        score += 25
        reasons.append("High reported progress needs recent field support")
    if re.search(r"delay|issue|missing|not|slow|inactive|no work", observation, re.I):
        score += 25
        reasons.append("Inspector observation contains a potential issue signal")
    score = min(score, 100)
    status = "attention" if score >= 60 else "review" if score >= 25 else "normal"
    return {
        "status": status,
        "score": score,
        "reasons": reasons,
        "recommendation": {
            "attention": "Schedule inspection or request clarification.",
            "review": "Review the latest evidence.",
            "normal": "No exception detected from available evidence.",
        }[status],
    }


if __name__ == "__main__":
    print(detect(72, 15, "Latest evidence needs verification"))
