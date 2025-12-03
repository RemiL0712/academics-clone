"use client";

import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

const COUNTRIES = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo (Congo-Brazzaville)",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Democratic Republic of the Congo",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar (Burma)",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];


type Address = {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  company?: string | null;
  country: string;
  street1: string;
  street2?: string | null;
  city: string;
  postcode: string;
  phone: string;
  email: string;
};

export default function AddressesPage() {
  const [user, setUser] = useState<User | null>(null);
  const [address, setAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("Malta");
  const [street1, setStreet1] = useState("");
  const [street2, setStreet2] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // ===== LOAD USER + ADDRESS =====
  useEffect(() => {
    const stored =
      typeof window !== "undefined" ? localStorage.getItem("user") : null;

    if (!stored) {
      setLoading(false);
      return;
    }

    try {
      const parsed = JSON.parse(stored) as User;
      setUser(parsed);

      const loadAddress = async () => {
        try {
          const res = await fetch(`/api/address?userId=${parsed.id}`);
          if (!res.ok) throw new Error("Failed to load address");
          const data = await res.json();
          if (data.address) {
            setAddress(data.address);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      loadAddress();
    } catch (err) {
      console.error("Failed to parse user from localStorage", err);
      setLoading(false);
    }
  }, []);

  // коли переходимо в режим редагування – заповнюємо форму
  useEffect(() => {
    if (!editing) return;

    if (address) {
      setFirstName(address.firstName);
      setLastName(address.lastName);
      setCompany(address.company || "");
      setCountry(address.country);
      setStreet1(address.street1);
      setStreet2(address.street2 || "");
      setCity(address.city);
      setPostcode(address.postcode);
      setPhone(address.phone);
      setEmail(address.email);
    } else if (user) {
      // нова адреса – підставимо ім'я та емейл з юзера
      const [fn, ...rest] = user.name.split(" ");
      setFirstName(fn || "");
      setLastName(rest.join(" "));
      setEmail(user.email);
    }
  }, [editing, address, user]);

  const handleEditClick = () => {
    setError(null);
    setSuccess(null);
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setError(null);
    setSuccess(null);
  };

  // ===== SUBMIT =====
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setError(null);
    setSuccess(null);
    setSaving(true);

    try {
      const res = await fetch("/api/address", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          firstName,
          lastName,
          company,
          country,
          street1,
          street2,
          city,
          postcode,
          phone,
          email,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to save address");
      }

      setAddress(data.address);
      setSuccess("Address saved successfully.");
      setEditing(false);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to save address.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <main className="p-6 text-sm text-zinc-500">Loading address…</main>;
  }

  if (!user) {
    return (
      <main className="p-6 text-sm text-zinc-500">
        You need to log in to manage your addresses.
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="mb-2 text-2xl font-semibold text-[var(--gs-primary)]">
        Addresses
      </h1>
      <p className="mb-6 text-sm text-zinc-600">
        The following address will be used on the checkout page by default.
      </p>

      {/* CARD */}
      <section className="max-w-3xl rounded-2xl border border-[var(--gs-light)] bg-white p-6 shadow-sm">
        {!editing ? (
          <>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[var(--gs-dark)]">
                Billing address
              </h2>
              <button
                type="button"
                onClick={handleEditClick}
                className="text-sm font-medium text-[var(--gs-primary)] hover:underline"
              >
                Edit billing address
              </button>
            </div>

            {address ? (
              <div className="whitespace-pre-line text-sm text-zinc-800">
                <p>
                  {address.firstName} {address.lastName}
                </p>
                {address.company && <p>{address.company}</p>}
                <p>{address.street1}</p>
                {address.street2 && <p>{address.street2}</p>}
                <p>{address.city}</p>
                <p>{address.postcode}</p>
                <p>{address.country}</p>
                <p>{address.phone}</p>
                <p>{address.email}</p>
              </div>
            ) : (
              <p className="text-sm text-zinc-600">
                You have not set up your billing address yet.
              </p>
            )}
          </>
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[var(--gs-dark)]">
                Billing address
              </h2>
            </div>

            {error && (
              <div className="mb-4 rounded-md border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-700">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 rounded-md border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm text-emerald-700">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block font-medium text-[var(--gs-dark)]">
                    First name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-[var(--gs-light)] bg-[var(--gs-bg)] px-3 py-2 outline-none focus:border-[var(--gs-primary)] focus:bg-white"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block font-medium text-[var(--gs-dark)]">
                    Last name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-[var(--gs-light)] bg-[var(--gs-bg)] px-3 py-2 outline-none focus:border-[var(--gs-primary)] focus:bg-white"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block font-medium text-[var(--gs-dark)]">
                  Company name (optional)
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-[var(--gs-light)] bg-[var(--gs-bg)] px-3 py-2 outline-none focus:border-[var(--gs-primary)] focus:bg-white"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-1 block font-medium text-[var(--gs-dark)]">
                  Country / Region <span className="text-red-500">*</span>
                </label>

                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                  className="w-full rounded-lg border border-[var(--gs-light)] bg-[var(--gs-bg)] px-3 py-2 outline-none focus:border-[var(--gs-primary)] focus:bg-white"
                >
                  <option value="">Select a country</option>

                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>


              <div>
                <label className="mb-1 block font-medium text-[var(--gs-dark)]">
                  Street address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="mb-2 w-full rounded-lg border border-[var(--gs-light)] bg-[var(--gs-bg)] px-3 py-2 outline-none focus:border-[var(--gs-primary)] focus:bg-white"
                  placeholder="House number and street name"
                  value={street1}
                  onChange={(e) => setStreet1(e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="w-full rounded-lg border border-[var(--gs-light)] bg-[var(--gs-bg)] px-3 py-2 outline-none focus:border-[var(--gs-primary)] focus:bg-white"
                  placeholder="Apartment, suite, unit, etc. (optional)"
                  value={street2}
                  onChange={(e) => setStreet2(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-1 block font-medium text-[var(--gs-dark)]">
                  Town / City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-[var(--gs-light)] bg-[var(--gs-bg)] px-3 py-2 outline-none focus:border-[var(--gs-primary)] focus:bg-white"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="mb-1 block font-medium text-[var(--gs-dark)]">
                  Postcode / ZIP <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-[var(--gs-light)] bg-[var(--gs-bg)] px-3 py-2 outline-none focus:border-[var(--gs-primary)] focus:bg-white"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="mb-1 block font-medium text-[var(--gs-dark)]">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  className="w-full rounded-lg border border-[var(--gs-light)] bg-[var(--gs-bg)] px-3 py-2 outline-none focus:border-[var(--gs-primary)] focus:bg-white"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="mb-1 block font-medium text-[var(--gs-dark)]">
                  Email address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className="w-full rounded-lg border border-[var(--gs-light)] bg-[var(--gs-bg)] px-3 py-2 outline-none focus:border-[var(--gs-primary)] focus:bg-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-full bg-[var(--gs-primary)] px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[var(--gs-primary-deep)] disabled:opacity-60"
                >
                  {saving ? "Saving…" : "Save address"}
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="rounded-full border border-zinc-300 px-6 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100"
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}
      </section>
    </main>
  );
}
