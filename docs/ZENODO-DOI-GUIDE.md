# Immutable Prior Art Archival via Zenodo DOI

To establish legally unchallengeable, timestamped prior art for the **Agent Exchange Protocol (AEP)** under the sole authorship of **Steven B. Tomlinson**:

## Steps to Register a DOI

1. **Log in to Zenodo**:
   - Visit [Zenodo.org](https://zenodo.org/) (operated by CERN).
   - Log in using your GitHub account (`steven-tomlinson`).

2. **Enable GitHub Repository Archiving**:
   - Go to [zenodo.org/account/settings/github/](https://zenodo.org/account/settings/github/).
   - Flip the switch to **ON** for `steven-tomlinson/agent-exchange-protocol-spec`.

3. **Create a Tagged Release on GitHub**:
   Run the following CLI command:
   ```bash
   gh release create v0.1.0-draft --title "AEP-001 v0.1.0 Specification Release" --notes "Initial public specification draft and JSON schema package by Steven B. Tomlinson."
   ```

4. **Retrieve and Embed DOI Badge**:
   - Zenodo will automatically archive the repository snapshot and generate a DOI URL (e.g. `https://doi.org/10.5281/zenodo.XXXXXXX`).
   - Add the resulting Zenodo DOI badge to `README.md` and `AEP-001.md`.

---
*Created by Steven B. Tomlinson <turbodex@steventomlinson.dev>*</package>
