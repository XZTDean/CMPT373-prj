package com.orcus.hha_report_manager.model;

import javax.persistence.*;

@Entity
@Table(name = "rehab_record")
public class Rehab {
    @Id
    private int year;

    @Id
    private int month;

    @Column(name = "bedsAvailable")
    private int bedsAvailable;

    @Column(name = "bedsDays")
    private int bedsDays;

    @Column(name = "patientDays")
    private int patientDays;

    @Column(name = "hospitalized")
    private int hospitalized;

    @Column(name = "dischargedAlive")
    private int dischargedAlive;

    @Column(name = "diedBefore48h")
    private int diedBefore48h;

    @Column(name = "diedAfter48h")
    private int diedAfter48h;

    @Column(name = "daysHospitalised")
    private int daysHospitalised;

    @Column(name = "referrals")
    private int referrals;

    @Column(name = "transfers")
    private int transfers;

    @Column(name = "selfDischarged")
    private int selfDischarged;

    @Column(name = "stayedWard")
    private int stayedWard;

    @Column(name = "admissions")
    private int admissions;

    public Rehab() {
    }

    public Rehab(int year, int month) {
        this.year = year;
        this.month = month;
        this.bedsAvailable = 0;
        this.bedsDays = 0;
        this.patientDays = 0;
        this.hospitalized = 0;
        this.dischargedAlive = 0;
        this.diedBefore48h = 0;
        this.diedAfter48h = 0;
        this.daysHospitalised = 0;
        this.referrals = 0;
        this.transfers = 0;
        this.selfDischarged = 0;
        this.stayedWard = 0;
        this.admissions = 0;
    }

    public Rehab(int year, int month, int bedsAvailable, int bedsDays, int patientDays, int hospitalized, int dischargedAlive, int diedBefore48h, int diedAfter48h, int daysHospitalised, int referrals, int transfers, int selfDischarged, int stayedWard, int admissions) {
        this.year = year;
        this.month = month;
        this.bedsAvailable = bedsAvailable;
        this.bedsDays = bedsDays;
        this.patientDays = patientDays;
        this.hospitalized = hospitalized;
        this.dischargedAlive = dischargedAlive;
        this.diedBefore48h = diedBefore48h;
        this.diedAfter48h = diedAfter48h;
        this.daysHospitalised = daysHospitalised;
        this.referrals = referrals;
        this.transfers = transfers;
        this.selfDischarged = selfDischarged;
        this.stayedWard = stayedWard;
        this.admissions = admissions;
    }
}
