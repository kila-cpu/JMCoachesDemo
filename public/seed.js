// Demo data for the JM Coaches prototype. Dates are worked out from today so
// the history and job cards always look current.
window.JM_SEED = (function () {
  "use strict";
  const pad = n => String(n).padStart(2, "0");
  const iso = d => d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  const day = n => { const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + n); return d; };
  const at = (n, h, m) => { const d = day(n); d.setHours(h, m || 0); return d.getTime(); };
  const due = n => iso(day(n));
  const yr = new Date().getFullYear();

  const vehicles = [
    { id: "jm01", fleet: "JM01", reg: "242-MH-1180", model: "Volvo 9700", type: "Coach", seats: 53, odo: 148320, cvrtDue: due(190), serviceDue: due(24) },
    { id: "jm02", fleet: "JM02", reg: "231-MH-2045", model: "Scania Irizar i6", type: "Coach", seats: 57, odo: 212870, cvrtDue: due(75), serviceDue: due(9) },
    { id: "jm03", fleet: "JM03", reg: "231-MH-2046", model: "Scania Irizar i6", type: "Coach", seats: 57, odo: 205410, cvrtDue: due(76), serviceDue: due(41) },
    { id: "jm04", fleet: "JM04", reg: "222-MH-3310", model: "VDL Futura FHD2", type: "Coach", seats: 49, odo: 301550, cvrtDue: due(18), serviceDue: due(-3) },
    { id: "jm05", fleet: "JM05", reg: "221-MH-0877", model: "Mercedes Tourismo", type: "Coach", seats: 49, odo: 288040, cvrtDue: due(132), serviceDue: due(55) },
    { id: "jm06", fleet: "JM06", reg: "192-MH-4421", model: "Volvo B11R Plaxton", type: "School bus", seats: 70, odo: 402880, cvrtDue: due(48), serviceDue: due(14) },
    { id: "jm07", fleet: "JM07", reg: "181-MH-5532", model: "Volvo B9R Plaxton", type: "School bus", seats: 70, odo: 455120, cvrtDue: due(220), serviceDue: due(33) },
    { id: "jm08", fleet: "JM08", reg: "241-MH-0912", model: "Mercedes Sprinter 516", type: "Minibus", seats: 19, odo: 61230, cvrtDue: due(300), serviceDue: due(62) },
    { id: "jm09", fleet: "JM09", reg: "232-MH-1774", model: "Mercedes Sprinter Mobility", type: "Accessible minibus", seats: 16, odo: 74410, cvrtDue: due(160), serviceDue: due(19) },
    { id: "jm10", fleet: "JM10", reg: "211-MH-6650", model: "Iveco Daily Midi", type: "Midi coach", seats: 33, odo: 238900, cvrtDue: due(95), serviceDue: due(6) },
  ].map(v => Object.assign({ depot: "JM Coaches depot", trailer: false }, v));

  const staff = [
    { id: "dm", name: "Declan Murphy", role: "mechanic", title: "Workshop Foreman", phone: "087 441 2093", licence: "B, C, D", joined: "2011-03-14" },
    { id: "ab", name: "Aidan Byrne", role: "mechanic", title: "Mechanic", phone: "086 302 7781", licence: "B, D", joined: "2018-09-03" },
    { id: "jm", name: "John McGrath", role: "driver", phone: "087 610 4452", licence: "B, D, D1", joined: "2009-06-01" },
    { id: "ss", name: "Siobhán Smith", role: "driver", phone: "085 271 9930", licence: "B, D, D1", joined: "2016-02-22" },
    { id: "pc", name: "Pat Carolan", role: "driver", phone: "087 993 0145", licence: "B, D", joined: "2013-11-11" },
    { id: "mf", name: "Martin Farrelly", role: "driver", phone: "086 554 2387", licence: "B, D, D1", joined: "2019-04-08" },
    { id: "ck", name: "Ciara Kennedy", role: "driver", phone: "083 118 6624", licence: "B, D1", joined: "2021-08-30" },
    { id: "gr", name: "Gerry Reilly", role: "driver", phone: "087 720 3318", licence: "B, D", joined: "2007-01-15" },
    { id: "of", name: "Office", role: "admin" },
  ].map(p => Object.assign({ pin: "1111" }, p));

  // A week of checks: most nil-defect, a few with defects that became job cards.
  const drivers = ["jm", "ss", "pc", "mf", "ck", "gr"];
  const checks = [];
  for (let n = -6; n <= -1; n++) {
    vehicles.forEach((v, i) => {
      if ((i + n) % 4 === 0) return;   // not every vehicle goes out every day
      const d = drivers[(i + n + 12) % drivers.length], t = at(n, 6 + (i % 3), 5 + i * 4);
      checks.push({ id: "WC-" + iso(day(n)).replace(/-/g, "").slice(2) + "-" + v.fleet, vehicleId: v.id, driverId: d, at: t, duration: 9 + (i % 6), odo: v.odo - (-n) * 180 - i * 7, results: {}, remarks: "", photos: [], seed: true });
    });
  }
  const chk = (tag, vid, drv, n, h, m, results, remarks) => { const v0 = vehicles.find(v => v.id === vid), id = "WC-" + iso(day(n)).replace(/-/g, "").slice(2) + "-" + v0.fleet + "-" + tag; const c = { id, vehicleId: vid, driverId: drv, at: at(n, h, m), duration: 14, odo: vehicles.find(v => v.id === vid).odo - 40, results, remarks: remarks || "", photos: [], seed: true }; checks.push(c); return c.id; };
  const CK = {};
  CK.D1 = chk("A", "jm04", "gr", -1, 6, 40, { airsusp: { s: "def", sev: "major", note: "Coach leaning on nearside rear, air bag losing pressure overnight.", photos: [], job: yr + "-218" } });
  CK.D2 = chk("B", "jm06", "pc", -2, 7, 5, { lightswork: { s: "def", sev: "minor", note: "Offside rear indicator flickering.", photos: [], job: yr + "-214" }, schoolsigns: { s: "def", sev: "minor", note: "Rear school bus sign cracked at the corner.", photos: [], job: yr + "-215" } });
  CK.D3 = chk("C", "jm02", "ss", -3, 6, 20, { wheels: { s: "def", sev: "minor", note: "Nearside steer tyre worn on the outer edge, approx 3mm.", photos: [], job: yr + "-211" } });
  CK.D4 = chk("D", "jm09", "ck", 0, 7, 12, { lift: { s: "def", sev: "major", note: "Wheelchair lift stops halfway on the way down.", photos: [], job: yr + "-220" } }, "Taken Sprinter JM08 instead for the day centre run.");

  const job = (o) => Object.assign({ status: "Open", priority: "Normal", mechId: null, desc: "", labour: [], rate: 60, parts: [], noParts: false, partsNotes: "", workDone: "", photos: [], docket: null, customer: "JM Coaches fleet", customerId: "jm", seed: true }, o, { id: yr + "-" + o.n });
  const lab = (mech, n, h, m, mins) => ({ mechId: mech, start: at(n, h, m), end: mins ? at(n, h, m) + mins * 60000 : null });
  const jobs = [
    job({ n: 220, vehicleId: "jm09", type: "Defect repair", priority: "VOR", title: "Wheelchair lift: stops halfway on the way down", desc: "Wheelchair lift stops halfway on the way down.", created: at(0, 7, 14), checkId: CK.D4, item: "lift", reportedBy: "ck", sev: "major" }),
    job({ n: 218, vehicleId: "jm04", type: "Defect repair", priority: "VOR", status: "In progress", mechId: "dm", title: "Air suspension: nearside rear air bag losing pressure", desc: "Coach leaning on nearside rear, air bag losing pressure overnight.", created: at(-1, 6, 42), checkId: CK.D1, item: "airsusp", reportedBy: "gr", sev: "major", labour: [lab("dm", -1, 9, 0, 95), { mechId: "dm", start: Date.now() - 50 * 60000, end: null }], workDone: "Air bag split on the inner face. Replacement ordered from supplier, levelling valve checked OK.", parts: [{ desc: "Air spring bellows, rear", partNo: "VFH-2034", qty: 1, cost: 186 }] }),
    job({ n: 217, vehicleId: "jm10", type: "Service", priority: "High", status: "Awaiting parts", mechId: "ab", title: "B service due — 240,000 km", created: at(-2, 10, 0), reportedBy: "dm", labour: [lab("ab", -2, 11, 0, 150)], workDone: "Oil and filters changed. Front brake pads at limit, pads on order.", parts: [{ desc: "Engine oil 10W-40 (20L)", partNo: "OIL-1040", qty: 1, cost: 112 }, { desc: "Oil filter", partNo: "IV-5801", qty: 1, cost: 24.5 }, { desc: "Fuel filter", partNo: "IV-5802", qty: 1, cost: 31 }] }),
    job({ n: 216, vehicleId: "jm04", type: "CVRT prep", title: "Pre-CVRT inspection before test in 18 days", created: at(-2, 15, 30), reportedBy: "dm" }),
    job({ n: 215, vehicleId: "jm06", type: "Bodywork", title: "School bus signs: rear sign cracked at the corner", desc: "Rear school bus sign cracked at the corner.", created: at(-2, 7, 6), checkId: CK.D2, item: "schoolsigns", reportedBy: "pc", sev: "minor" }),
    job({ n: 214, vehicleId: "jm06", type: "Defect repair", status: "Complete", mechId: "ab", title: "Lights & indicators: offside rear indicator flickering", desc: "Offside rear indicator flickering.", created: at(-2, 7, 6), checkId: CK.D2, item: "lightswork", reportedBy: "pc", sev: "minor", labour: [lab("ab", -2, 13, 10, 40)], workDone: "Bulb holder corroded. Cleaned contacts, replaced bulb and holder. Tested all indicators OK.", parts: [{ desc: "Indicator bulb holder", partNo: "PL-7711", qty: 1, cost: 14.2 }, { desc: "Bulb 24V 21W", partNo: "BLB-2421", qty: 1, cost: 2.4 }], closedAt: at(-2, 13, 52), signedOffBy: "ab", roadworthy: true }),
    job({ n: 213, vehicleId: "jm01", type: "Valet & cleaning", status: "Complete", mechId: "dm", title: "Deep clean after private hire weekend", created: at(-3, 9, 0), reportedBy: "jm", labour: [lab("dm", -3, 9, 15, 120)], workDone: "Full interior valet, seats shampooed, toilet serviced and restocked.", noParts: true, closedAt: at(-3, 11, 20), signedOffBy: "dm", roadworthy: true }),
    job({ n: 211, vehicleId: "jm02", type: "Tyres", status: "In progress", mechId: "ab", title: "Tyres: nearside steer tyre worn on outer edge", desc: "Nearside steer tyre worn on the outer edge, approx 3mm.", created: at(-3, 6, 25), checkId: CK.D3, item: "wheels", reportedBy: "ss", sev: "minor", labour: [lab("ab", -1, 14, 0, 45)], workDone: "Tyre swapped. Tracking to be checked." }),
    job({ n: 209, vehicleId: "jm07", type: "Service", status: "Complete", mechId: "dm", title: "A service — 455,000 km", created: at(-5, 8, 0), reportedBy: "dm", labour: [lab("dm", -5, 8, 10, 180)], workDone: "A service completed to schedule. Greased all points, checked brakes and steering.", parts: [{ desc: "Engine oil 10W-40 (20L)", partNo: "OIL-1040", qty: 2, cost: 112 }, { desc: "Oil filter", partNo: "VO-2190", qty: 1, cost: 38 }, { desc: "Air filter", partNo: "VO-2191", qty: 1, cost: 64 }], closedAt: at(-5, 11, 30), signedOffBy: "dm", roadworthy: true }),
    job({ n: 207, vehicleId: "jm03", type: "Defect repair", status: "Complete", mechId: "ab", title: "Passenger door: slow to close", desc: "Front passenger door slow to close, hissing at the ram.", created: at(-6, 7, 30), reportedBy: "mf", item: "door", sev: "minor", labour: [lab("ab", -6, 10, 0, 70)], workDone: "Door ram seal replaced, door speed adjusted and tested.", parts: [{ desc: "Door ram seal kit", partNo: "DR-3320", qty: 1, cost: 42 }], closedAt: at(-6, 11, 20), signedOffBy: "ab", roadworthy: true }),
  ];

  return { schema: 1, vehicles, staff, checks, jobs, nextJ: 220, settings: { rate: 60 } };
})();
