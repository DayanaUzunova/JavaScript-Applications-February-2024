import { addLike, deleteAlbum, editAlbum, getAlbumById, getAllAlbumLikes, hasUserLikedAlbum } from '../data/data.js';
import { html } from '../lib/lib.js';
import { createSubmitHandler } from '../utils/formHelper.js';
import { getUserId } from '../utils/userHelper.js';

const detailsTemplate = (album, likes, isOwner, canLike, onDelete, onLike) => html`
    <section id="details">
        <div id="details-wrapper">
            <p id="details-title">Album Details</p>
            <div id="img-wrapper">
                <img src=${album.imageUrl} alt="example1" />
            </div>
            <div id="info-wrapper">
                <p><strong>Band:</strong><span id="details-singer">${album.singer}</span></p>
                <p><strong>Album name:</strong><span id="details-album">${album.album}</span></p>
                <p><strong>Release date:</strong><span id="details-release">${album.release}</span></p>
                <p><strong>Label:</strong><span id="details-label">${album.label}</span></p>
                <p><strong>Sales:</strong><span id="details-sales">${album.sales}</span></p>
            </div>
            <div id="likes">Likes: <span id="likes-count">${likes}</span></div>

            <!--Edit and Delete are only for creator-->
            ${isOwner
                ? html` <div id="action-buttons">
                      <a href="/details/${album._id}/edit" id="edit-btn">Edit</a>
                      <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>
                  </div>`
                : html`
                      ${canLike
                          ? html` <div id="action-buttons">
                                <a href="javascript:void(0)" id="like-btn" @click=${onLike}>Like</a>
                            </div>`
                          : null}
                  `}
        </div>
    </section>
`;

export async function showDetailsView(ctx) {
    const id = ctx.params.id;

    const album = await getAlbumById(id);
    let likes = await getAllAlbumLikes(id);

    const isOwner = ctx.user?._id === album._ownerId;
    let canLike = ctx.user && !isOwner && !(await hasUserLikedAlbum(ctx.user?._id, id));

    function update() {
        ctx.render(detailsTemplate(album, likes, isOwner, canLike, onDelete, onLike));
    }

    update();

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this item?');

        if (choice) {
            await deleteAlbum(id);
            ctx.goTo('/dashboard');
        }
    }

    async function onLike() {
        await addLike(id);
        likes++;
        canLike = false;
        update();
    }
}
