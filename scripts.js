let idees =
JSON.parse(localStorage.getItem("idees")) || []
let currentIdeaId = null

const form =
document.getElementById("idea-form")

const ideasContainer =
document.getElementById("ideas-container")

const titleInput =
document.getElementById("title")

const categoryInput =
document.getElementById("categorie")

const descriptionInput =
document.getElementById("description")

form.addEventListener("submit", (e) => {

  e.preventDefault()

  const nouvelleIdee = {

    id: Date.now(),

    titre: titleInput.value,

    categorie: categoryInput.value,

    description: descriptionInput.value,

    archivee: false

  }

  idees.push(nouvelleIdee)

  localStorage.setItem(
    "idees",
    JSON.stringify(idees)
  )

  afficherIdees()

  titleInput.value = ""
  categoryInput.value = ""
  descriptionInput.value = ""

})

function afficherIdees() {
    const couleursCartes = {
    pedagogie: "note-pedagogie",
    evenement: "note-evenement",
    campus: "note-campus",
    technique: "note-technique"
    }

  const couleurs = {
    pedagogie: "text-bg-warning",
    evenement: "text-bg-info",
    campus: "text-bg-secondary",
    technique: "text-bg-success"
  }

  const labels = {
    pedagogie: "Pédagogie",
    evenement: "Événement",
    campus: "Vie de campus",
    technique: "Technique"
  }
 const archiveBtn =
document.getElementById("show-archives")

const archives =
idees.filter(
  idee => idee.archivee
)

archiveBtn.style.display =
archives.length > 0
? "inline-block"
: "none"

  ideasContainer.innerHTML = ""
  if (idees.length === 0) {

    ideasContainer.innerHTML = `
      <div class="text-center py-5">

        

        <h4>Aucune idée pour le moment</h4>

        <p class="text-muted">
          Soyez la première personne à proposer une idée !
        </p>

      </div>
    `

    return
  }
  else if (idees.length > 0) {

  ideasContainer.innerHTML = `
    <h3 class="mb-4">
       Voici les idées proposées
    </h3>
  `
}


  idees
   .filter(idee => !idee.archivee)
  .forEach((idee) => {

    const badgeColor =
    couleurs[idee.categorie]

    const cardWrapper =
    document.createElement("div")

    cardWrapper.classList.add(
      "col-12",
      "col-md-6",
      "col-lg-4"

    )

    const card =
    document.createElement("div")

   card.classList.add(
  "card",
  "border-0",
  "shadow-sm",
  "rounded-4",
  couleursCartes[idee.categorie]
)

    card.innerHTML = `

      <div class="card-body">

        <div class="d-flex justify-content-between align-items-center">

          <span class="badge rounded-pill ${badgeColor}">
            ${labels[idee.categorie]}
          </span>

          <div class="dropdown">

            <button
               type="button"
               class="btn btn-light btn-sm rounded-circle"
              data-bs-toggle="dropdown">

              ⋮

            </button>

            <ul class="dropdown-menu">

              <li>
                <a
                  href="#"
                  class="dropdown-item edit-btn"
                  data-id="${idee.id}">
                  Modifier
                </a>
              </li>

              <li>
                <a
                  href="#"
                  class="dropdown-item text-danger delete-btn"
                  data-id="${idee.id}">
                  Supprimer
                </a>
              </li>
              <li>
                 <a
                 href="#"
                 class="dropdown-item archive-btn"
                 data-id="${idee.id}">
                 Archiver
               </a>
             </li>

            </ul>

          </div>

        </div>

        <h5 class="fw-bold mt-3">
          ${idee.titre}
        </h5>

        <p class="text-muted">
          ${idee.description}
        </p>

      </div>

    `

    cardWrapper.appendChild(card)

    ideasContainer.appendChild(cardWrapper)

  })

}

document.addEventListener("click", (e) => {

  if (
    e.target.classList.contains("delete-btn")
  ) {

    e.preventDefault()

    const id =
    Number(e.target.dataset.id)

    idees = idees.filter(
      idee => idee.id !== id
    )

    localStorage.setItem(
      "idees",
      JSON.stringify(idees)
    )

    afficherIdees()

  }

})

document.addEventListener("click", (e) => {

 
 if (e.target.classList.contains("edit-btn")) {

  e.preventDefault()

  const id =
  Number(e.target.dataset.id)

  const idee =
  idees.find(
    idee => idee.id === id
  )

  currentIdeaId = id

  document.getElementById(
    "edit-title"
  ).value = idee.titre

  document.getElementById(
    "edit-description"
  ).value = idee.description

  const modal =
  new bootstrap.Modal(
    document.getElementById("editModal")
  )

  modal.show()

}
})
document
.getElementById("save-edit")
.addEventListener("click", () => {

  const idee =
  idees.find(
    idee => idee.id === currentIdeaId
  )

  idee.titre =
  document.getElementById(
    "edit-title"
  ).value

  idee.description =
  document.getElementById(
    "edit-description"
  ).value

  localStorage.setItem(
    "idees",
    JSON.stringify(idees)
  )

  afficherIdees()

  bootstrap.Modal
    .getInstance(
      document.getElementById("editModal")
    )
    .hide()

})
document.addEventListener("click", (e) => {

  if (e.target.classList.contains("archive-btn")) {

    e.preventDefault()

    const id =
    Number(e.target.dataset.id)

    const idee =
    idees.find(
      idee => idee.id === id
    )

    idee.archivee = true

    localStorage.setItem(
      "idees",
      JSON.stringify(idees)
    )

    afficherIdees()

  }

})

document
.getElementById("show-archives")
.addEventListener("click", () => {
    document.getElementById("show-archives").style.display = "none"

    document.getElementById("show-ideas").style.display = "inline-block"

  ideasContainer.innerHTML = `
    <h3 class="mb-4">
      Idées archivées
    </h3>
  `

  const couleursCartes = {
    pedagogie: "note-pedagogie",
    evenement: "note-evenement",
    campus: "note-campus",
    technique: "note-technique"
  }

  const couleurs = {
    pedagogie: "text-bg-warning",
    evenement: "text-bg-info",
    campus: "text-bg-secondary",
    technique: "text-bg-success"
  }

  const labels = {
    pedagogie: "Pédagogie",
    evenement: "Événement",
    campus: "Vie de campus",
    technique: "Technique"
  }

  idees
    .filter(idee => idee.archivee)
    .forEach((idee) => {

      const cardWrapper =
      document.createElement("div")

      cardWrapper.classList.add(
        "col-12",
        "col-md-6",
        "col-lg-4"
      )

      const card =
      document.createElement("div")

      card.classList.add(
        "card",
        "border-0",
        "shadow-sm",
        "rounded-4",
        couleursCartes[idee.categorie]
      )

      card.innerHTML = `
        <div class="card-body">

          <span class="badge rounded-pill ${couleurs[idee.categorie]}">
            ${labels[idee.categorie]}
          </span>

          <h5 class="fw-bold mt-3">
            ${idee.titre}
          </h5>

          <p class="text-muted">
            ${idee.description}
          </p>

        </div>
      `

      cardWrapper.appendChild(card)
      ideasContainer.appendChild(cardWrapper)

    })

})
document
.getElementById("show-ideas")
.addEventListener("click", () => {

  afficherIdees()

  document.getElementById("show-ideas").style.display = "none"

  document.getElementById("show-archives").style.display = "inline-block"

})

afficherIdees()